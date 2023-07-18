import { Component } from "react";
import categoryRequester from "../../util/requester/categoryRequester";
import languageRequester from "../../util/requester/languageRequester";
import Swal from "sweetalert2";
import { alert } from "../../util/alert";
import { timeout } from "q";





const categorydataRequester = new categoryRequester();
const languagedataRequester = new languageRequester();






class AbsCateLan extends Component{

    constructor(props){
        super(props);
        this.t = this.props.t;

        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleModifyButton = this.handleModifyButton.bind(this);
        this.updateName = this.updateName.bind(this);
        
        
        }



    render(){
        return(
            <div class="row-cols-lg-5 w-25">
                <button class="btn btn-danger fs-5 bts" onClick={this.handleDeleteButton}><i class="bi bi-trash"></i></button>
                <button class= "btn btn-secondary fs-5 bts" onClick={this.handleModifyButton}><i class="bi bi-pencil"></i></button>
                <button class= "btn btn-success fs-5 bts" onClick={this.handleAddButton}><i class="bi bi-plus-square"></i></button>                 
            </div>

                
        );
    }

    handleAddButton(event){
        event.preventDefault()
        if(this.props.to === "Category"){
            Swal.fire({
                title: `${this.t('global:header:Insert-new-category')}`,
                html:
                  
                  '<input id="categoryName" type="text" class="swal2-input-name">' +
                  '<br></br>' + 
                  `<label class="btn" for="file-input" id="file-label" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 4px; cursor: pointer;">${this.t("global:header:Choose-file")}</label>` +
                  '<label id="file-name" class="m-2"></label>' +
                  '<input id="file-input" type="file" class="swal2-input-image" style="display:none;">',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: this.t('global:header:Save'),
                cancelButtonText: this.t('global:header:Cancel'),
                preConfirm: () => ({
                  name: document.getElementsByClassName('swal2-input-name')[0].value,
                  img: document.getElementsByClassName('swal2-input-image')[0].files[0],
                }),
                willOpen: () => {
                    document.getElementById('file-input').addEventListener('change', () => {
                    document.getElementById('file-name').innerHTML = document.getElementById('file-input').value.slice(12);
                  });
                }
                
            }).then(async result => { 
                console.log(result.value)
                if(result.value.name !== ""){
                    const formData = new FormData();
                    formData.append('file', result.value.img);
                    console.log(result.value.img)
                    await categorydataRequester.createCategory(result.value.name, result.value.img).then(alert("success",`${this.t('global:header:New-category-created')}`))
                    this.props.refresh();
                }
                else{
                    alert("error", this.t("global:header:Please-insert-a-valid-category"))
                }
            })
        }
        if(this.props.to === "Language"){
            Swal.fire({
                title:`${this.t('global:header:Insert-new-language')}`,
                input: 'text',
                showCancelButton: true,
                confirmButtonText: this.t("global:header:Save"),
                cancelButtonText: this.t("global:header:Cancel"),
                inputValidator: (value) => {
                    // Verificar si el valor es vacío
                    if (!value) {
                      return this.t("global:header:Please-insert-a-valid-language");
                    }
                  },
            }).then(async result => { 
                console.log(result.value)
                if(result.value){
                    await languagedataRequester.createLanguage(result.value).then(alert("success",`${this.t('global:header:New-language-created')} `));
                    this.props.refresh();
                }
            })
        }
    }

    updateName(){
        try{
        document.getElementById("file-name").innerHTML = document.getElementById("file-input").value.slice(12)
        console.log(document.getElementById("file-input").value.slice(12))
        }
        catch(error){
            console.log(error)
        }
    }
        

    async handleDeleteButton(event){
        if(this.checkActive()){
            event.preventDefault()
            try{
                (this.props.to === "Category") ? await categorydataRequester.deleteCategory(this.props.active) : await languagedataRequester.deleteLanguage(this.props.active);
            
            Swal.fire({
                icon :"success",
                title : `${this.t('global:header:The')} ${this.props.to} ${this.t('global:header:Was-deleted')}`,
                timer:3000
            })
            this.props.refresh();
            
            }
            catch(error){
                console.log("error")
            }
            
            
            
            
        }
    }


    handleModifyButton(event){
        if(this.checkActive()){
            event.preventDefault()
            if(this.props.to === "Category"){
                Swal.fire({
                    title: `${this.t('global:header:Insert-new-category')}`,
                    html:
                      
                      '<input id="categoryName" type="text" class="swal2-input-name">' +
                      '<br></br>' + 
                      `<label class="btn" for="file-input" id="file-label" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 4px; cursor: pointer;">${this.t("global:header:Choose-file")}</label>` +
                      '<label id="file-name" class="m-2"></label>' +
                      '<input id="file-input" type="file" class="swal2-input-image" style="display:none;">',
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: this.t('global:header:Save'),
                    cancelButtonText: this.t('global:header:Cancel'),
                    preConfirm: () => ({
                      name: document.getElementsByClassName('swal2-input-name')[0].value,
                      img: document.getElementsByClassName('swal2-input-image')[0].files[0],
                    }),
                    willOpen: () => {
                        document.getElementById('file-input').addEventListener('change', () => {
                        document.getElementById('file-name').innerHTML = document.getElementById('file-input').value.slice(12);
                      });
                    }
                    
                }).then(async result => { 
                    console.log(result.value)
                    if(result.value.name !== ""){
                        const formData = new FormData();
                        formData.append('file', result.value.img);
                        console.log(result.value.img)
                        await categorydataRequester.modifyCategory(this.props.active, result.value.name, result.value.img).then(alert("success",`${this.t('global:header:Name-of-the')} ${this.props.to} ${this.t('global:header:changed')}`))
                        this.props.refresh();
                    }
                    else{
                        alert("error", this.t("global:header:Please-insert-a-valid-category"))
                    }
                })
            }
            if(this.props.to === "Language"){
                Swal.fire({
                    title:`${this.t('global:header:Insert-new-language')}`,
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: this.t("global:header:Save"),
                    cancelButtonText: this.t("global:header:Cancel"),
                    inputValidator: (value) => {
                        // Verificar si el valor es vacío
                        if (!value) {
                          return this.t("global:header:Please-insert-a-valid-language");
                        }
                      },
                }).then(async result => { 
                    console.log(result.value)
                    if(result.value){
                        await languagedataRequester.modifyLanguage(this.props.active, result.value).then(alert("success",`${this.t('global:header:Name-of-the')} ${this.props.to} ${this.t('global:header:changed')} `));
                        this.props.refresh();
                    }
                })
            }
        }

    }


    //This method checks if there is an active element selected, if not it will not continue with the request
    checkActive(){
        if(this.props.active !== ""){
            return true;
        }
        else{
            return alert("error", `${this.t('global:header:Please-select')} ${this.t("global:header:"+ this.props.to)}`)
        }
    }

}




export default AbsCateLan;