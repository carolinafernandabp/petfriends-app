import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { finalize, Observable } from 'rxjs';
import { PetloverService } from 'src/app/services/petlover.service';

@Component({
  selector: 'app-registro-pet',
  templateUrl: './registro-pet.component.html',
  styleUrls: ['./registro-pet.component.scss'],
})
export class RegistroPetComponent implements OnInit {

        constructor(private router : Router,
          private authService : PetloverService,
          private storage : AngularFireStorage,
          private fb: FormBuilder,
          private toastController: ToastController) { }

          @ViewChild('imageUser') inputImageUser!: ElementRef;

          public email: string = '';
          public password: string = '';

          uploadPercent!: Observable<number> | any;
          urlImage!: Observable<string>;

      ngOnInit() {}

      onUpload(e :any) {
       //console.log('subir', e.target.files[0]);


      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
      const filePath = `uploads/profile_${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

      }

      onAddUser() {
      this.authService.registerUser(this.email, this.password)
      .then((res: any) => {
      this.authService.isAuth().subscribe((user: { updateProfile: (arg0: { displayName: string; photoURL: any; }) => Promise<any>; }) => {
      if (user) {
        user.updateProfile({
          displayName: '',
          photoURL: this.inputImageUser.nativeElement.value
        }).then(() => {
          this.router.navigate(['/login-petlover']);
        }).catch((error: any) => console.log('error', error));
      }
      });
      }).catch((err: { message: any; }) => console.log('err', err.message));
      }

      onLoginRedirect(): void {
      this.router.navigate(['/login-petlover']);
      }
}
