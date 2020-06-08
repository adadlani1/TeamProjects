import { AbstractControl } from '@angular/forms';
import { controllers } from 'chart.js';

//checks if the software field in the form is empty
function softwareNull(control: AbstractControl) {
    let softwareField = control.root.get('software_name');
    if ( (softwareField !== null) && (softwareField !== undefined) ) {
        if (softwareField.value === "") {
            return true;
        }
    }

    return false;
}

//checks if the hardware field in the form is empty
function hardwareNull(control: AbstractControl) {
    let hardwareField = control.root.get('deviceType');
    if ( (hardwareField !== null) && (hardwareField !== undefined) ) {
        if (hardwareField.value === "") {
            return true;
        }
    }

    return false;
}

//checks if the hardware serial field in the form is empty
function serialNull(control: AbstractControl) {
    let serialField = control.root.get('serial');
    if ( (serialField !== null) && (serialField !== undefined) ) {
        if (serialField.value === "") {
            return true;
        }
    }

    return false;
}

//checks if both software and hardware fields in the form are empty, returns errors if true
export function softwareAndHardware(control: AbstractControl) {
    let softwareField = control.root.get('software_name');
    let hardwareField = control.root.get('deviceType');
    let boolean = false

    //if both software and hardware are null, then return error
    if ( (softwareNull(control) === true) && (hardwareNull(control) == true) ) {
        boolean = true;
        softwareField.setErrors( {bothEmpty: true} );
        hardwareField.setErrors( {bothEmpty: true} );

        return {bothEmpty: true};
    }
    //if not get rid of error
    else {
        if (softwareField != null && hardwareField != null) {
            softwareField.setErrors( null );
            hardwareField.setErrors( null );
            return null;
        }
        
        return {bothEmpty: true};
    }
}

//validation for check if both software and software version are filled
export function softwareVersionValidation(control: AbstractControl) {
        let softwareField = control.root.get('software_name');
        let versionField = control.root.get('version');

        //Checks if hardware and software error is displayed
        if (softwareField != null ) {
            if (softwareField.errors != null) {
                if (softwareField.errors.hasOwnProperty('bothEmpty')) {
                    return softwareField.errors;
                }
            }
            
        }

        //returns no error if software and software version are both empty
        if (softwareField == null && versionField == null) {
            return null;
        }
        //returns an error if software is filled but software version is empty
        else if (softwareField != null && versionField.value == "") {
            return { versionRequired: true};
        }
        else {
            if (softwareField.errors != null) {
                if (softwareField.errors.hasOwnProperty('versionRequired')) {
                    delete softwareField.errors.versionRequired;
                }
            }
            return softwareField.errors;
        }
    }

export function versionValidation(control: AbstractControl) {
    let softwareField = control.root.get('software_name');
    let versionField = control.root.get('version');

    if (softwareField == null){
        return null;
    }
    //returns no error if software and software version are both empty
    if (versionField == null ) {
        softwareField.setErrors({ versionRequired: true});
        return null;
    }
    //returns an error if software is filled but software version is empty
    else if (versionField.value == "") {
        softwareField.setErrors({ versionRequired: true})
        return null;
    }
    else {
        if (softwareField.errors != null) {
            if (softwareField.errors.hasOwnProperty('versionRequired')) {
                softwareField.setErrors(null);
            }
        }
        
        return null;
    }
}

//checks if hardware and serial fields are empty or filled, returns errors if true


//checks if hardware and serial fields are empty or filled, returns errors if true
export function hardwareValidation(control: AbstractControl) {
    let hardwareField = control.root.get('deviceType');
    let serialField = control.root.get('serial');

    //Checks if hardware and software error is displayed
    if (hardwareField != null ) {
        if (hardwareField.errors != null) {
            if (hardwareField.errors.hasOwnProperty('bothEmpty')) {
                return hardwareField.errors;
            }
        }  
    }

    //if hardware and serial are both empty set errors to null
    if ( (hardwareField == null) && ( serialField == null) ) {
        return null;
    }
    //if hardware or serial is empty set error
    else if ( (hardwareField.value == "") || ( serialField.value == "") ) {
        return {hardwareError: true};
    }

}

export function serialValidation(control: AbstractControl) {
    let hardwareField = control.root.get('deviceType');
    let serialField = control.root.get('serial');


    if (hardwareField == null){
        return null;
    }

    //if hardware and software values are not equal to empty strings then set error to null
    if ( (hardwareField.value != "") && ( serialField.value != "") ) {
        if (hardwareField.errors != null) {
            if (hardwareField.errors.hasOwnProperty('hardwareError')) {
                hardwareField.setErrors(null);
            }
        }
        return null;
    }
    //if hardware or software values are equal to empty string, set error
    else if ( (hardwareField.value == "") || ( serialField.value == "") ) {
        hardwareField.setErrors({ hardwareError: true})
        return null;
    }

}