import { Component, OnInit } from "@angular/core";
import { TableDataService }from '../../services/table-data.service';
import { Router } from '@angular/router';

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
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "table.component.html",
})
export class TableComponent implements OnInit {
  public tableData=[]

  public Id=4;
  public Date = "";
  public Expenses = "";
  public Purpose = "";
  public Amount=0;

  public editDetails: any = {};
  public preveditDetails: any = {};
  public table_editindex=0;

  constructor(private Table_Data_service: TableDataService, private router: Router){}

  ngOnInit() {
    this.GetData();
  }

  GetData()
  {
    this.tableData=this.Table_Data_service.GetAllTableData();
    console.log(this.tableData)
  }

  Adddata()
  { 
    if(this.Date=="" || this.Expenses=="" || this.Purpose == "" || this.Amount==0)
    {
        return;
    }
    const obj: any = {
        Id: this.Id,
        Date: this.Date,
        Expenses: this.Expenses,
        Purpose: this.Purpose,
        Amount: this.Amount,
        Category: []
    }
    this.Table_Data_service.AddNewTableData(obj);
    this.GetData();
    

    this.Id=this.Id+1;

    this.Date="";
    this.Expenses="";
    this.Purpose="";
    this.Amount=0;

  }


  DeletetableData(id: number)
  {
    this.Table_Data_service.DeleteTabledata(id);
    this.GetData();
  }

  EditDetailsClick(itemdata: any,ind)
  {
    this.table_editindex=ind;
    this.preveditDetails=itemdata;
    this.editDetails = {
        Id: itemdata.Id,
        Date: itemdata.Date,
        Expenses: itemdata.Expenses,
        Purpose: itemdata.Purpose,
        Amount: itemdata.Amount,
        Category: itemdata.Category
    }
  }

  FinalEditDetails()
  {    
    if(this.editDetails.Date=="")
    {
        this.editDetails.Date=this.preveditDetails.Date;
    }
    if(this.editDetails.Expenses=="" )
    {
        this.editDetails.Expenses=this.preveditDetails.Expenses;
    }
    if(this.editDetails.Purpose == "")
    {
        this.editDetails.Purpose=this.preveditDetails.Purpose;
    }
    if(this.editDetails.Amount==0)
    {
        this.editDetails.Amount=this.preveditDetails.Amount;
    }
    const id=this.editDetails.Id;

    this.Table_Data_service.EditTableData(this.table_editindex,this.editDetails);
    
    this.GetData();
  }


  GoToCategory(id)
  {
    this.router.navigate([`/category/${id}`]);
  }

}
