import { AbstractControl } from "@angular/forms"

export const checkPasswordValidator = (control: AbstractControl) => {

    return control.get('password')?.value == control.get('rePassword')?.value ? null : { mismatch: true }

    // if (control.get('password')?.value == control.get('rePassword')?.value) {
    //     return null
    // } else {
    //     return {
    //         mismatch: true
    //     }
    // }
}