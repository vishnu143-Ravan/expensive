import { Component, OnInit } from '@angular/core';
import { TableDataService }from '../../services/table-data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  public category= [];

  public Id=9;
  public Name = "";
  public Description = "";

  public table_id=0;
  public add_button_cat_status=false;

  public editDetails: any = {};
  public preveditDetails: any = {};

  public expenses_table_id = [];

  constructor(private Table_Data_Service: TableDataService, private activeroute: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.activeroute.paramMap.subscribe((params : ParamMap)=> {  
      const tab_id=params.get('table_id');
      
      setTimeout(() => {
        if(tab_id=="all")
        {
          this.add_button_cat_status=false;
          this.getCategoryDataWithoutTableId();
        }
        else
        {
          this.table_id=Number(tab_id);
          this.add_button_cat_status=true;
          this.getCategoryData();
        }
      }, 1000);
    });  
  }

  getCategoryDataWithoutTableId()
  {
    this.category=this.Table_Data_Service.getAllCategoryWithoutTableId();
    this.expenses_table_id = this.Table_Data_Service.GetAlltableExpenses();
  }

  getCategoryData()
  {
    console.log("data");
    
    this.category=this.Table_Data_Service.GetCategoryOftable(this.table_id)

    let n=this.category.length;
    if(n==0)
    {
      this.Id=1;
      return;
    }
    console.log(this.category[n-1]);
    
    this.Id=this.category[n-1].Id+1;
  }

  AddCatdata()
  {
    if(this.Name=="" || this.Description=="")
    {
        return;
    }
    
    const obj: any = {
        Id: this.Id,
        Name: this.Name,
        Description: this.Description,
        Sub_Category: []
    }    

    this.Table_Data_Service.AddCategoryToData(this.table_id,obj);

    this.Id=this.Id+1;

    this.Name="";
    this.Description="";

  }

  DeleteCattableData(cat_id)
  {
    this.Table_Data_Service.deleteCategoryFromTable(this.table_id,cat_id);
    this.getCategoryData();
  }

  EditCatDetailsClick(itemdata: any)
  {

    this.preveditDetails=itemdata;
    this.editDetails = {
        Id: itemdata.Id,
        Name: itemdata.Name,
        Description: itemdata.Description,
        Sub_category : itemdata.Sub_category
    }
  }

  FinalCatEditDetails()
  {    
    if(this.editDetails.Name=="")
    {
        this.editDetails.Name=this.preveditDetails.Name;
    }
    if(this.editDetails.Description=="" )
    {
        this.editDetails.Description=this.preveditDetails.Description;
    }
    const cat_id=this.editDetails.Id;

    this.Table_Data_Service.EditCategoryInTableData(this.table_id,cat_id,this.editDetails);
    
    this.getCategoryData();

  }


  GoToSubCategory(category_id)
  {
    this.router.navigate([`/sub_categoty/${this.table_id}/${category_id}`]);
  }


}
