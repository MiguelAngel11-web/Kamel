
import { ValidatorFn, AbstractControl} from '@angular/forms';
import { ApiService } from './../../service/api.service'
import { map } from 'rxjs/operators';


export class Validator{

  static validateEmail(api : ApiService){
    return (control:AbstractControl)=>{
      const value = control.value;
      return  api.CheckMail(`https://kinder-mountie-14642.herokuapp.com/user/${value}`)
      .pipe(
        map(response =>{
          console.log(response);
          if(response!="Email Available"){
            response=null
            console.log("Entro");
          }
   /*        console.log(response); */
          return response ? null : {noDisponible:true}
        })
      )
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoIguales: true });
    }
  }
}
