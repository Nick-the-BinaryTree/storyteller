import { AbstractControl } from "@angular/forms";

export const urlValidator = (control: AbstractControl): { [key: string]: any } => {
    const urlReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    return urlReg.test(control.value) ? null : { 'malformedURL': { value: control.value } };
};