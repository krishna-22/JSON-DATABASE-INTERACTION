function additem(evt)
{
    evt.preventDefault();
    var myid=f1.txtid.value;
    var myname=f1.txtname.value;
    var rec={
        "id":myid,
        "itemname":myname
    }
    console.log(rec);
    fetch("http://localhost:3000/food",{
        "method":"POST",
        body:JSON.stringify(rec),
        "headers":{"content-type":"application/JSON"}
    })
    .then(
        (res)=>{
            //if(res.responseStatus==201)
            console.log("added succcessfully"+res)
            getallitems();
        }
    )
    .catch(
        (e)=>{
            console.log("FAILURE")
        }
    )
}

function getallitems()
{
    fetch("http://localhost:3000/food")
        .then(
            (records)=>{
                console.log(records);
                return records.json();    
            })
        .then(
                (rows)=>{
                    console.log(rows);

                    var ele="<table border=3 ><tr><td>id</td><td>itemname</td></tr>";
                    rows.forEach((rec )=> {
                        ele+=`<tr><td> ${rec.id}</td><td>${rec.itemname}</td></tr>
                        <td> <input type="button" value="Delete" onclick=(delrec(${rec.id}))><td>
                        <td> <input type="button" value="Edit" onclick=(editrec(${rec.id}))><td>`
                        
                    })

                    ele+="</table>";
                    console.log(ele);   
                    document.getElementsByTagName("span")[0].innerHTML=ele;

                }
        )
        .catch(
            (e)=>{
                console.log(e)
            }
        )
}
function delrec(myid){
    fetch(`http://localhost:3000/food/${myid}`,
    {
        "method":"DELETE"
    }
    )
    .then(
        (res)=>
        {
        console.log("Deleted Successfully based on Id");
        getallitems();
    }
    )
    .catch(
        (e)=>
        {
            console.log(e);
        }

    )
}
function editrec(myid){
    fetch(`http://localhost:3000/food/${myid}`)
    .then(
        (records)=>{
            console.log(records);
            return records.json();    
        })
    .then(
            (rows)=>{
                ffx.txtid.value=rows.id;
                ffx.txtname.value=row.itemname;
            }
    )
    .catch(
        (e)=>
        {
            console.log(e);
        }

    )
}
function edititem(evt)
{
    evt.preventDefault();
    var myid=ffx.txtid.value;
    var myname=ffx.txtname.value;
    var rec={
        "id":myid,
        "itemname":myname
    }
    console.log(rec);
    fetch(`http://localhost:3000/food/${myid}`,{
        "method":"PUT",
        body:JSON.stringify(rec),
        "headers":{"content-type":"application/JSON"}
    })
    .then(
        (res)=>{
            //if(res.responseStatus==201)
            console.log("added succcessfully"+res)
            getallitems();
        }
    )
    .catch(
        (e)=>{
            console.log("FAILURE")
        }
    )
}
getallitems();