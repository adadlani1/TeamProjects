export const TREE_OPTION = {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  legend: {},
  series: [
    {
      type: 'tree',
      name: '',
      data: [],
      top: '5%',
      left: '7%',
      bottom: '2%',
      right: '10%',

      symbolSize: 12,

      label: {
        normal: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        }
      },

      leaves: {
        label: {
          normal: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        }
      },

      expandAndCollapse: true,

      animationDuration: 550,
      animationDurationUpdate: 750

    },
  ]
};
export const TREE_DATA_1 = {
  name: 'Problem Types',
  children: [
    {
      name: 'Software',
      children: [{name: 'Keeps Crashing', children: [{name: 'xyz'}]}]
    },
    {
      name: 'Hardware', children:
        [
          {name: 'Wires', children: [{name: 'Plastic Casing Pierced', children: [{name: 'Metal Wire Visible'}]}]},
          {name: 'Webcam'},
          {name: 'Printer', children: [{name: 'No Ink', children: [{name: 'Black'}, {name: 'CMYK'}]}]}
        ]
    },
    {
      name: 'display',
      children: [
        {
          name: 'DirtySprite',
          children: [
            {
              name: 'Keeps Crashing',
              children: [
                {
                  name: 'xyz'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
