<?php
	require_once "connect-with-token-authentication.php";
    
    // Uses recursive CTE to get all problem types along with their path in the tree, 
    // from root node to that specific node. Path is of the format root.child.childofchild
    // e.g. for type 'printer queue cancellation', its path is 
    // 'software.printer software.printer queue cancellation'
    $query = "WITH RECURSIVE types AS
              (
                  SELECT type, CONVERT(type, CHAR(1024)) AS path 
                  FROM problem_type WHERE parent_type IS NULL
                  UNION ALL
                  SELECT child.type, CONCAT(path, '.', child.type)
                  FROM problem_type child
                  JOIN types ON types.type = child.parent_type
              )
              SELECT * FROM types ORDER BY path";

	$result = $conn->query($query);
    
    if (!$result) {
        die($conn->error);
    }

    $conn->close();

    $tree = array();
    
    // For every record, we observe the path for that record. We use that
    // path to descend down the tree to the location the new node (problem_type)
    // should be placed, and insert it there into the tree. For example, if a record's path
    // is 'hardware.laptop.battery replacement', we'd descend down the tree to reach
    // the node 'laptop', and then insert 'battery replacement' node as one of 'laptop'
    // node's children.
    while($row = $result->fetch_assoc()) {
        $type = $row['type'];
        $path_nodes = explode('.', $row['path']);
        $path_length = sizeof($path_nodes);
        
        // For loop descends down the tree to the correct path location.
        // For each iteration, we look for the node to descend down for that level
        // (the node given in the path for that specific depth level), and go
        // down a level by setting a reference ($sub_tree) to that node's children array.
        $sub_tree =& $tree;
        for ($i = 0; $i < $path_length - 1; $i++) {
            //The child node we want to descend down for this current level
            $type_to_find_on_current_level = $path_nodes[$i];

            // Get the index of that child node
            $j = 0;
            while ($sub_tree[$j]['type'] != $type_to_find_on_current_level) {
                $j++;
            }

            // Descend down a level by setting a reference to
            // that child node's children array
            $sub_tree =& $sub_tree[$j]['children'];
        }
        
        // Insert current node into the reached path destination
        $current_node = array('type' => $type, 'children' => []);
        $sub_tree[] = $current_node;
	}

	echo json_encode($tree);
?>