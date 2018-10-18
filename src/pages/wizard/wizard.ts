import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

/**
 * Generated class for the WizardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wizard',
  templateUrl: 'wizard.html',
})
export class WizardPage {

  private firstForm : FormGroup;
  private secondForm : FormGroup;
  private thirdForm : FormGroup;

  get percentQuestion() {
    return this.firstForm.get('percentQuestionName')
  }
 // index: number;

  @ViewChild(Slides) slides: Slides;
 
  constructor( public alertCtrl: AlertController, 
              public navCtrl: NavController,
              private formBuilder: FormBuilder, 
              public navParams: NavParams, 
              public plt: Platform
             ) {
      // let required = null;
    this.firstFormFunct(); 
    this.secondFormFunct();
    this.thirdFormFunct(); 
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad WizardPage');
    setTimeout( _ => {
      this.slideChanged() 
      }, 300 );
  };
  vetValue: string = "";
  SeparationQuestion: string = ""; 
  disabilityQValue: string = "";

  disableSwipe() {
    this.nextButton = true;
    this.shouldLockSwipeToNext = true;
  }
 
  eneableSwipe() {
    this.nextButton = false;
    this.shouldLockSwipeToNext = false;
  }
  //callled when status changes for forms
  statusChangeFunct(valid: boolean) {
    if(valid == true) {
      this.eneableSwipe()
    }else if( valid == false) {
      this.disableSwipe()
    } 
    this.lockNextSlide()
  }
  //declare firstForm; set contol names; set validators
  firstFormFunct() {
    this.firstForm = this.formBuilder.group({
      branch:  ['', Validators.compose([Validators.required])],
      vetOrActive: ['', Validators.compose([Validators.required])],
      separationDate: ['', Validators.compose([Validators.required])],
      disability: ['', Validators.compose([Validators.required])],
      percentQuestion: ["",  ]
    });
    //observable called when status of firstForm changes => calls function that enables or disabled swipe if conditions are met
    this.firstForm.statusChanges
      .subscribe(val => {
        this.statusChangeFunct(this.firstForm.valid)
      })
    //when value changes make separation data appear and change wording depending on conditions
    this.firstForm.controls.vetOrActive.valueChanges
      .subscribe( val =>{
        if(val =="Active") {
          this.SeparationQuestion = "When is your separation date?"
        }else if(val == "Veteran") {
          this.SeparationQuestion = "When was your sepatation date?"
        }else {
          this.SeparationQuestion = "";
        }
      this.vetValue = val;
      })
    //when value changes for disability question change validator requirements for percentQuestion depending on condition
    this.firstForm.controls.disability.valueChanges
      .subscribe( data => {
        const percentQuestion = this.firstForm.get('percentQuestion')
        if(data == "disability") {  
          percentQuestion.setValidators( Validators.compose([Validators.maxLength(3),Validators.required ,Validators.pattern('^[1-9]$|^[1-9][0-9]$|^(1/00)$')]));
        }else {           
          percentQuestion.clearValidators() 
        }
        percentQuestion.updateValueAndValidity()
        this.disabilityQValue = data; 
      })
  };
 //
  employedAnswer: string= "";
  //declare SecondForm; set contol names; set validators
  secondFormFunct(){
    this.secondForm = this.formBuilder.group({
      employment: ['', Validators.compose([Validators.required])],
      lastEmployed: [''],
      marriage: ['', Validators.compose([Validators.required])],
    });
    //when status changes call function to lock or unlock swipe dependign if form is valid
    this.secondForm.statusChanges
      .subscribe(val => {
        this.statusChangeFunct(this.secondForm.valid)
      })
  //if error 'infinite loop' comment out .upadateValueAndValidity()'
    //when value changes for employment question, set validators for lastEmployment question and update form depending if marked as unemployed
    this.secondForm.controls.employment.valueChanges
      .subscribe( data => {
        const employmentQuestion = this.secondForm.get('lastEmployed')
        if(data == "Unemployed") { 
          employmentQuestion.setValidators(Validators.compose([ Validators.required]));
        }else {
          employmentQuestion.clearValidators() 
        }
        employmentQuestion.updateValueAndValidity();
        this.employedAnswer = data; 
      })
  };

  //declare thirdForm; set contol names; set validators
  thirdFormFunct() {
    this.thirdForm = this.formBuilder.group({
      rank: ["", Validators.compose([ Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      MOS: ["", Validators.compose([ Validators.maxLength(9), Validators.required,  Validators.pattern('[0-9]+')]) ]
    });
  };
  // called when users click on nav bar 'next' button; only enabled when forms are valid
  next() {
    this.slides.slideNext(500);
  }
  //shouldLockSwipeToNext variable can be either true/false depending on condition
  lockNextSlide(){
    this.slides.lockSwipeToNext(this.shouldLockSwipeToNext);
  }
  //the logic that determines if slide should be lockSwiped 
  nextButton: boolean = false;
  shouldLockSwipeToNext: boolean = false;
  slideChanged() {
    let index = this.slides.realIndex; 
    if((index == 5 && !this.firstForm.valid) || (index == 6 && !this.secondForm.valid) || (index == 8 ) || (index == 7))  {
      this.disableSwipe()
    }else {
      this.eneableSwipe()
    }
    this.lockNextSlide()
  }
 
  //when navigating to the new slide when user clicks submit 
  //submitIntent: boolean = false;
  // onSubmitOne() {  
  //   console.log(this.firstForm)
  //   if( this.firstForm.valid) {
  //     this.shouldLockSwipeToNext = false;
  //     this.lockNextSlide()
  //     this.next();
  //     console.log("valid")
  //   } else {
  //     console.log("inavalid")
  //   }
  //   this.submitIntent = true;
  // }

  customizeSelectOptions(title: string, message: string ) {
   let obj: object = {
     title: title,
     message: message,
     cssClass: 'branchRadio',
   }
   return obj;
  }

  branchOption = this.customizeSelectOptions("Military Branch", "Select a branch");
  vetOrActiveOptions = this.customizeSelectOptions("Military Status", "Select one");
  disabilityOptions = this.customizeSelectOptions("Disability Status", "Select one");
  UnemployedOptions = this.customizeSelectOptions("Employement Status", "Select one");
  marriageOptions = this.customizeSelectOptions("Marriage Status","Select one");
 
  onSubmit() {
    let userData: object = {
      branch: this.firstForm.value.branch,
      veteranOrActive: this.firstForm.value.vetOrActive,
      separationDate: this.firstForm.value.separationDate,
      disabilityStatus: this.firstForm.value.disability,
      disabilityPercent: this.firstForm.value.percentQuestion,
      employmentStatus: this.secondForm.value.employment,
      lastEmployed: this.secondForm.value.lastEmployed,
      marriageStatus: this.secondForm.value.marriage,
      militaryRank: this.thirdForm.value.rank,
      MOS: this.thirdForm.value.MOS
    }
    console.log(userData)
    this.shouldLockSwipeToNext = false;
    this.lockNextSlide()
    this.next();
    this.slides.lockSwipeToPrev(true);
  }

}

