import { Injectable } from "@angular/core";

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
    Sub_Catogory: {
      Id: String;
      Name: String;
      Description;
    };
  };
}

@Injectable({
  providedIn: "root",
})
export class TableDataService {
  public table_data = [];
  public dummydata = [
    {
      Id: 1,
      Date: "29/08/2002",
      Expenses: "400",
      Purpose: "To buy rice",
      Amount: "600",
      Category: [
        {
          Id: 1,
          Name: "Rice",
          Description: "I want Rice as food",
          Sub_Category: [
            {
              Id: 1,
              Name: "biryani rice",
              Description: "To cook biryani",
            },
            {
              Id: 2,
              Name: "Normal rice",
              Description: "To cook food",
            },
          ],
        },
      ],
    },
    {
      Id: 2,
      Date: "29/08/2002",
      Expenses: "800",
      Purpose: "To buy clothes",
      Amount: "1000",
      Category: [
        {
          Id: 2,
          Name: "To buy clothes",
          Description: "I want clothes to wear",
          Sub_Category: [
            {
              Id: 1,
              Name: "Night clothes",
              Description: "To free during Night time",
            },
            {
              Id: 2,
              Name: "Normal clothes",
              Description: "To look professional",
            },
          ],
        },
      ],
    },
    {
      Id: 3,
      Date: "29/08/2002",
      Expenses: "700",
      Purpose: "For room rent",
      Amount: "800",
      Category: [
        {
          Id: 1,
          Name: "Room rent",
          Description: "I want place to sleep and to lead life",
          Sub_Category: [
            {
              Id: 1,
              Name: "Rest room",
              Description: "To free during office time",
            },
            {
              Id: 2,
              Name: "Normal Room",
              Description: "To lead life and enjoy ",
            },
          ],
        },
      ],
    },
  ];

  constructor() {}

  AddNewTableData(data) {
    this.table_data.push(data);
    console.log(this.table_data)
  }

  GetAllTableData() {
    return this.table_data;
  }

  GetAlltableExpenses() {
    let expenses = this.table_data.reduce((data, table) => {
      if(table != undefined && table != null && table.Expenses!="") {
        data.push({
          "Id":table.Id,
          "expenses":table.Expenses
        });
      }
    });
    return expenses;
  }

  GetCategoryOftable(table_id)
  {    
    return this.table_data[table_id]['Category'];
  }

  GetSub_CategoryOfCategory(table_id, category_id)
  {    
    return this.table_data[table_id]['Category'][category_id]['Sub_Category'];
  }

  AddCategoryToData(table_id, data) {    
    this.table_data[table_id]?.Category.push(data);
  }

  AddSubCategoryToCategory(table_id, category_id, data) {
    
    this.table_data[table_id]["Category"][category_id]["Sub_Category"].push(data);
  }

  DeleteTabledata(table_id)
  {
    this.table_data=this.table_data.filter((item) => item.Id!==table_id);
  }

  deleteCategoryFromTable(table_id, category_id) {
    this.table_data[table_id]['Category']=this.table_data[table_id]['Category'].filter((item) => item.Id!==category_id);
  }

  deleteSubCategoryFormTable(table_id, category_id, sub_catogory_id) {
    this.table_data[table_id]['Category'][category_id]['Sub_Category']=this.table_data[table_id]['Category'][category_id]['Sub_Category'].filter((item) => item.Id!==sub_catogory_id);
  }

  EditTableData(table_ind,data)
  {
    this.table_data[table_ind]=data;
  }

  EditCategoryInTableData(table_id,category_id,data)
  {
    this.table_data[table_id]['Category'][category_id] = data;
  }

  EditSubCategoryInCategoryData(table_id,category_id,sub_catogory_id,data)
  {
    this.table_data[table_id]['Category'][category_id]['Sub_Category'][sub_catogory_id] = data;
  }

  getAllCategoryWithoutTableId()
  {
    var ret_cat_data=[]
    let tab_size=this.table_data.length;
    for(let i=0;i<tab_size;i++)
    {
      if(this.table_data[i]['Category'].length>0)
      {
        let m=this.table_data[i]['Category'].length;
        for(let j=0;j<m;j++)
        {
          ret_cat_data.push(this.table_data[i]['Category'][j]);
        }
      }
    }
    return ret_cat_data;
  }

  getAllSubCategoryWithoutTableId()
  {
    var ret_subcat_data=[]
    let tab_size=this.table_data.length;
    for(let i=0;i<tab_size;i++)
    {
      if(this.table_data[i]['Category'].length>0)
      {
        let m=this.table_data[i]['Category'].length;
        for(let j=0;j<m;j++)
        {
          if(this.table_data[i]['Category'][j]['Sub_Category'].length>0)
          {
            let p=this.table_data[i]['Category'][j]['Sub_Category'].length;
            for(let k=0;k<p;k++)
            {
              ret_subcat_data.push(this.table_data[i]['Category'][j]['Sub_Category'][k]);
            }
          }
        }
      }
    }
    return ret_subcat_data;
  }


}
