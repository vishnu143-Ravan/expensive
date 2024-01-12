import { Component, OnInit } from '@angular/core';
import { TableDataService }from '../../services/table-data.service';
import { ActivatedRoute, ParamMap  } from '@angular/router';

declare interface TableData {
  Id: String;
  Date: String;
  Expenses: Number;
  Purpose: String;
  Amount: Number;
  Category: {
      Id: String;
      Name: String;
      Description;
      Sub_Catogory : {
          Id: String;
          Name: String;
          Description;
      }
  }
}

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})

export class SubCategoryComponent implements OnInit {
  
  public table_id=0;
  public category_id=0;

  public Id=9;
  public Name = "";
  public Description = "";

  public subcategory_data: any[]=[];

  public add_button_status=false;

  public editDetails: any = {};
  public preveditDetails: any = {};

  public editindex=0;

  constructor(private table_data_service: TableDataService,private activeroute: ActivatedRoute){}

  ngOnInit() {

    this.activeroute.paramMap.subscribe((params : ParamMap)=> {  
      const tab_id=params.get('table_id');  

      setTimeout(() => {
        if(tab_id=="all")
        {
          this.add_button_status=false;
          this.getSubCategoryWithoutTableid();
        }
        else
        {
          this.add_button_status=true;
          const cat_id=Number(params.get('category_id'));  
          this.table_id=Number(tab_id);
          this.category_id=cat_id;
          this.getSubCategoryData();
        }
      }, 1000);
    }); 
  }


  getSubCategoryWithoutTableid()
  {
    this.subcategory_data= this.table_data_service.getAllSubCategoryWithoutTableId();
  }

  getSubCategoryData()
  {
    this.subcategory_data=this.table_data_service.GetSub_CategoryOfCategory(this.table_id,this.category_id);
    let n=this.subcategory_data.length;
    if(n==0)
    {
      this.Id=1;
      return;
    }
    this.Id=this.subcategory_data[n-1].Id;
    this.Id=this.Id+1;

  }

  Adddata()
  {
    if(this.Name=="" || this.Description=="")
    {
        return;
    }
    const obj: any = {
        Id: this.Id,
        Name: this.Name,
        Description: this.Description
    }
    this.table_data_service.AddSubCategoryToCategory(this.table_id,this.category_id,obj);
    this.getSubCategoryData();

    this.Id=this.Id+1;

    this.Name="";
    this.Description="";

  }


  DeletetableData(subcategory_id: number)
  {
    this.table_data_service.deleteSubCategoryFormTable(this.table_id,this.category_id,subcategory_id);
    this.getSubCategoryData();
  }

  EditDetailsClick(itemdata: any,ind)
  {
    this.editindex=ind;
    this.preveditDetails=itemdata;
    this.editDetails = {
        Id: itemdata.Id,
        Name: itemdata.Name,
        Description: itemdata.Description
    }
  }

  FinalEditDetails()
  {    
    console.log(this.editDetails, this.editindex);
    
    if(this.editDetails.Name=="")
    {
        this.editDetails.Name=this.preveditDetails.Name;
    }
    if(this.editDetails.Description=="" )
    {
        this.editDetails.Description=this.preveditDetails.Description;
    }
    const sub_cat_id=this.editDetails.Id;

    this.table_data_service.EditSubCategoryInCategoryData(this.table_id,this.category_id,this.editindex,this.editDetails);

    this.getSubCategoryData();

  }

}