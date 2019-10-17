function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
//wait(7000);
//sql process
function processQuery(db, i, queries, dbname) {
    if(i < queries.length -1) {
      //console.log(i +' of '+queries.length);
      if(!queries[i+1].match(/(INSERT|CREATE|DROP|PRAGMA|BEGIN|COMMIT)/)) {
        queries[i+1] = queries[i]+ ';\n' + queries[i+1];
         return processQuery(db, i+1, queries, dbname);
      }
      //console.log('------------>', queries[i]);
      db.transaction( function (query){ 
        query.executeSql(queries[i]+';', [], function(tx, result) {
          processQuery(db, i +1, queries,dbname);  
        });          
      }, function(err) { 
      //console.log("Query error in ", queries[i], err.message);                          
      processQuery(db, i +1, queries, dbname);   
      });
  } else {
      console.log("Done importing!");
	  dongbotbl();
	  genform();
	  queryAndUpdateOverview_congtrinh();
	  queryAndUpdateOverview_thuyvan();
  }
  //dongbotbl();
}

function loadJson(url){
	//http://localhost/angiang/angiang_v2_truongedit/manager/manage/thucdia/service_dongbo/syn.php
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var username=data[i].username;
                var password=data[i].password;
				var fullname=data[i].fullname;
				var email=data[i].email;
				var tel=data[i].tel;
				var usertype=data[i].usertype;
				var idphongban=data[i].idphongban;
				var img=data[i].img;
                //var img=data[i].imgurl;
                //imgName = imgurl.substring(imgurl.lastIndexOf('/'));
                //console.log('we insert ' + username); // It works, display me the two different title
                transaction.executeSql('INSERT INTO users (id,username,password,fullname,email,tel,usertype,idphongban,img) VALUES (?,?,?,?,?,?,?,?,?)',[id,username,password,fullname,email,tel,usertype,idphongban,img]);
            }
        });
    });
}


function dongbotbl(){
	//load_users();
	load_districts();
	load_wards();
	load_solieu_congtrinh();
	//thuyvan
	load_solieu_thuyvan();
	//testsql();
}
function genform(){
	selectbox_v2('div_iddistricts_congtrinh','iddistricts','Huyện','districts','1=1','iddistricts','tendistricts');
	selectbox_v2('div_idwards_congtrinh','idwards','Xã','wards','1=1','idwards','tenwards');
	//thuyvan
	selectbox_v2('div_iddistricts_thuyvan','iddistricts','Huyện','districts','1=1','iddistricts','tendistricts');
	selectbox_v2('div_idwards_thuyvan','idwards','Xã','wards','1=1','idwards','tenwards');
}


function loadapp(){
	var login_cookie=getCookie('login');
	frm_active='';
	//var login_cookie=true;
	if(login_cookie=='true'){
		initDB();
		$.get('solieu_congtrinh.sql', function(response) {
		  processQuery(localDB, 0, response.split(';\n'), 'solieu_congtrinh'); 
		  //processQuery(localDB, 0, response.split(';\n'), 'solieu_congtrinh'); 
		});
		//dongbotbl();
		//genform();
		//queryAndUpdateOverview_congtrinh();
		//queryAndUpdateOverview_thuyvan();
		//menu_click('thuthap_congtrinh');
		createView();
		FULLNAME=getCookie('fullname');
		EMAIL=getCookie('email');
		IDUSERS=getCookie('id');
		LOGIN_STAT=getCookie('login');
		//document.getElementById('idusers').value = IDUSERS;
		document.frm_congtrinh.idusers.value=IDUSERS;
		document.frm_thuyvan.idusers.value=IDUSERS;
		page_default();
		document.getElementById("menu_thuthap_congtrinh").style.display = "block";
		document.getElementById("menu_dulieu_congtrinh").style.display = "block";
		//thuyvan
		document.getElementById("menu_thuthap_thuyvan").style.display = "block";
		document.getElementById("menu_dulieu_thuyvan").style.display = "block";
		
		document.getElementById("user_info").style.display = "block";
		document.getElementById("menu_dangnhap").style.display = "none";
		var loadapp_count=Number(getCookie('loadapp_count'))+1;
		setCookie('loadapp_count', loadapp_count, 30);
		$('#user_info_div').html('<div style="font-size: 18px;">'+FULLNAME+'</div><div style="font-size: 15px;">'+EMAIL+'</div>');
	}else{
		//w3_open();
		menu_click('dangnhap');
		//alert('hahaha');
		document.getElementById("menu_thuthap_congtrinh").style.display = "none";
		document.getElementById("menu_dulieu_congtrinh").style.display = "none";
		//thuyvan
		document.getElementById("menu_thuthap_thuyvan").style.display = "none";
		document.getElementById("menu_dulieu_thuyvan").style.display = "none";
		document.getElementById("user_info").style.display = "none";
		document.getElementById("menu_dangnhap").style.display = "block";
	}
}




function today(){
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-"
				+ (currentdate.getMonth()+1)  + "-" 
				+ currentdate.getDate() + " "  
				+ currentdate.getHours() + ":"  
				+ currentdate.getMinutes() + ":" 
				+ currentdate.getSeconds();
	//document.getElementById('ngaythunhan').value = datetime;
	//document.getElementById('idusers').value = IDUSERS;
	document.frm_congtrinh.idusers.value=IDUSERS;
	document.frm_congtrinh.ngaythunhan.value=datetime;
	document.frm_thuyvan.idusers.value=IDUSERS;
	document.frm_thuyvan.ngaythunhan.value=datetime;
}
//1. initialization

localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) {
            updateStatus("Error: DB not supported");
        }
        else {
            loadapp();
        }
    } 
    catch (e) {
        if (e == 2) {
            updateStatus("Error: Invalid database version.");
        }
        else {
            updateStatus("Error: Unknown error " + e + ".");
        }
        return;
    }
	//menu_click('thuthap_congtrinh');
}

function initDB(){
    var shortName = 'solieu_congtrinh';
    var version = '3.0';
    var displayName = 'solieu_congtrinh';
    var maxSize = 65536; // in bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function createTables(){
    var query = 'CREATE TABLE IF NOT EXISTS solieu_congtrinh(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, idusers VARCHAR, lat VARCHAR, lon VARCHAR, iddistricts VARCHAR, idwards VARCHAR, ghichu VARCHAR, ngaythunhan VARCHAR, hinh1 VARCHAR, hinh2 VARCHAR, hinh3 VARCHAR);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Sẵn sàng");
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to create table 'solieu_congtrinh' " + e + ".");
        return;
    }
	//thuyvan
	var query = 'CREATE TABLE IF NOT EXISTS solieu_thuyvan(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, idusers VARCHAR, lat VARCHAR, lon VARCHAR, iddistricts VARCHAR, idwards VARCHAR, ghichu VARCHAR, ngaythunhan VARCHAR, hinh1 VARCHAR, hinh2 VARCHAR, hinh3 VARCHAR);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Sẵn sàng");
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to create table 'solieu_thuyvan' " + e + ".");
        return;
    }
}

function createView(){
    var query = 'CREATE VIEW IF NOT EXISTS solieu_congtrinh_view AS SELECT t1.ghichu, t1.id, t1.trangthai, t1.baocaohuhong, t1.lon, t1.lat, t1.idusers, t1.ngaythunhan, t1.idusers, t1.iddistricts, t2.tendistricts, t1.idwards, t3.tenwards  FROM solieu_congtrinh t1 JOIN districts t2 ON t2.iddistricts = t1.iddistricts JOIN wards t3 ON t3.idwards = t1.idwards;';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Sẵn sàng");
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to create table 'solieu_congtrinh' " + e + ".");
        return;
    }
	//thuyvan
	var query = 'CREATE VIEW IF NOT EXISTS solieu_thuyvan_view AS SELECT t1.ghichu, t1.id, t1.doman, t1.mucnuoc, t1.lon, t1.lat, t1.idusers, t1.ngaythunhan, t1.idusers, t1.iddistricts, t2.tendistricts, t1.idwards, t3.tenwards  FROM solieu_thuyvan t1 JOIN districts t2 ON t2.iddistricts = t1.iddistricts JOIN wards t3 ON t3.idwards = t1.idwards;';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Sẵn sàng");
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to create table 'solieu_thuyvan' " + e + ".");
        return;
    }
}




//2. query db and view update

// event handler start with on*


function onUpdate_congtrinh(){
    var id = document.frm_congtrinh.id.value;
	var lat = document.frm_congtrinh.lat.value;
	var lon = document.frm_congtrinh.lon.value;
	var iddistricts = document.frm_congtrinh.iddistricts.value;
	var idwards = document.frm_congtrinh.idwards.value;
	var trangthai = document.frm_congtrinh.trangthai.value;
	var baocaohuhong = document.frm_congtrinh.baocaohuhong.value;
    var idusers = document.frm_congtrinh.idusers.value;
	var ghichu = document.frm_congtrinh.ghichu.value;
	var ngaythunhan = document.frm_congtrinh.ngaythunhan.value;
	
	var hinh1 = document.frm_congtrinh.hinh1.value;
	var hinh2 = document.frm_congtrinh.hinh2.value;
	var hinh3 = document.frm_congtrinh.hinh3.value;
	
    if (idusers == "") {
        updateStatus("Bạn chưa đăng nhập");
    }
    else {
        var query = "update solieu_congtrinh set idusers=?, lat=?, lon=?, iddistricts=?, idwards=?, trangthai=?, baocaohuhong=?, ghichu=?, ngaythunhan=?, hinh1=?, hinh2=?, hinh3=? where id=?;";
        try {
            localDB.transaction(function(transaction){
                //transaction.executeSql(query, [ten, lat, id], function(transaction, results){
				transaction.executeSql(query, [idusers, lat,lon,iddistricts,idwards,trangthai,baocaohuhong,ghichu,ngaythunhan,hinh1,hinh2,hinh3, id], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Error: No rows affected");
                    }
                    else {
                        updateForm_congtrinh("", "", "","","","","","","","","","","",true);
                        updateStatus("Updated rows:" + results.rowsAffected);
                        queryAndUpdateOverview_congtrinh();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Error: Unable to perform an UPDATE " + e + ".");
        }
    }
}

function onUpdate_thuyvan(){
    var id = document.frm_thuyvan.id.value;
	var lat = document.frm_thuyvan.lat.value;
	var lon = document.frm_thuyvan.lon.value;
	var iddistricts = document.frm_thuyvan.iddistricts.value;
	var idwards = document.frm_thuyvan.idwards.value;
	var doman = document.frm_thuyvan.doman.value;
	var mucnuoc = document.frm_thuyvan.mucnuoc.value;
    var idusers = document.frm_thuyvan.idusers.value;
	var ghichu = document.frm_thuyvan.ghichu.value;
	var ngaythunhan = document.frm_thuyvan.ngaythunhan.value;
	
    if (idusers == "") {
        updateStatus("Bạn chưa đăng nhập");
    }
    else {
        var query = "update solieu_thuyvan set idusers=?, lat=?, lon=?, iddistricts=?, idwards=?, doman=?, mucnuoc=?, ghichu=?, ngaythunhan=? where id=?;";
        try {
            localDB.transaction(function(transaction){
                //transaction.executeSql(query, [ten, lat, id], function(transaction, results){
				transaction.executeSql(query, [idusers, lat,lon,iddistricts,idwards,doman,mucnuoc,ghichu,ngaythunhan, id], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Error: No rows affected");
                    }
                    else {
                        updateForm_thuyvan("", "", "","","","","","","","",true);
                        updateStatus("Updated rows:" + results.rowsAffected);
                        queryAndUpdateOverview_thuyvan();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Error: Unable to perform an UPDATE " + e + ".");
        }
    }
}

function onDelete_congtrinh(){
    var id = document.frm_congtrinh.id.value;
    
    var query = "delete from solieu_congtrinh where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Error: No rows affected.");
                }
                else {
                    updateForm_congtrinh("", "", "","","","","","","","","","","",true);
                    updateStatus("Deleted rows:" + results.rowsAffected);
                    queryAndUpdateOverview_congtrinh();
					removemark();
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to perform an DELETE " + e + ".");
    }
    
}

function onDelete_thuyvan(){
    var id = document.frm_thuyvan.id.value;
    
    var query = "delete from solieu_thuyvan where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Error: No rows affected.");
                }
                else {
                    updateForm_thuyvan("", "", "","","","","","","","",true);
                    updateStatus("Deleted rows:" + results.rowsAffected);
                    queryAndUpdateOverview_thuyvan();
					removemark();
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to perform an DELETE " + e + ".");
    }
    
}

function onCreate_congtrinh(){
	today();
    var idusers = document.frm_congtrinh.idusers.value;
	var lat = document.frm_congtrinh.lat.value;
	var lon = document.frm_congtrinh.lon.value;
	var iddistricts = document.frm_congtrinh.iddistricts.value;
	var idwards = document.frm_congtrinh.idwards.value;
	var trangthai = document.frm_congtrinh.trangthai.value;
	var baocaohuhong = document.frm_congtrinh.baocaohuhong.value;
	var ghichu = document.frm_congtrinh.ghichu.value;
	var ngaythunhan = document.frm_congtrinh.ngaythunhan.value;
	
	var hinh1 = document.frm_congtrinh.hinh1.value;
	var hinh2 = document.frm_congtrinh.hinh2.value;
	var hinh3 = document.frm_congtrinh.hinh3.value;
	
    if ((lat=='')||(lon=="")) {
        //updateStatus("Lỗi: 'Tên' là bắt buộc!");
		updateStatus("Lỗi: Chưa nhập tọa độ vị trí!");
    }else if(iddistricts==''){
		updateStatus("Lỗi: Tên lĩnh vực là bắt buộc!");
	}else if(idwards==''){
		updateStatus("Lỗi: Tên loại cây/con là bắt buộc!");
	}else if(trangthai==''){
		updateStatus("Lỗi: Độ mặn là bắt buộc!");
	}else if(baocaohuhong==''){
		updateStatus("Lỗi: Mực nước là bắt buộc!");
	}else{
        var query = "insert into solieu_congtrinh (idusers, lat, lon, iddistricts, idwards,trangthai,baocaohuhong, ghichu, ngaythunhan, hinh1, hinh2, hinh3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        try {
            localDB.transaction(function(transaction){				
				console.log(lon);
                transaction.executeSql(query, [idusers,lat,lon,iddistricts,idwards,trangthai,baocaohuhong,ghichu,ngaythunhan,hinh1,hinh2,hinh3], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Error: No rows affected.");
                    }
                    else {
                        updateForm_congtrinh("", "", "","","","","","","","","","","",true);
						
                        updateStatus("Inserted row with id " + results.insertId);
                        queryAndUpdateOverview_congtrinh();
						removemark();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Error: Unable to perform an INSERT " + e + ".");
        }
    }
}

function onCreate_thuyvan(){
	today();
    var idusers = document.frm_thuyvan.idusers.value;
	var lat = document.frm_thuyvan.lat.value;
	var lon = document.frm_thuyvan.lon.value;
	var iddistricts = document.frm_thuyvan.iddistricts.value;
	var idwards = document.frm_thuyvan.idwards.value;
	var doman = document.frm_thuyvan.doman.value;
	var mucnuoc = document.frm_thuyvan.mucnuoc.value;
	var ghichu = document.frm_thuyvan.ghichu.value;
	var ngaythunhan = document.frm_thuyvan.ngaythunhan.value;
    if ((lat=='')||(lon=="")) {
        //updateStatus("Lỗi: 'Tên' là bắt buộc!");
		updateStatus("Lỗi: Chưa nhập tọa độ vị trí!");
    }else if(iddistricts==''){
		updateStatus("Lỗi: Tên lĩnh vực là bắt buộc!");
	}else if(idwards==''){
		updateStatus("Lỗi: Tên loại cây/con là bắt buộc!");
	}else if(doman==''){
		updateStatus("Lỗi: Độ mặn là bắt buộc!");
	}else if(mucnuoc==''){
		updateStatus("Lỗi: Mực nước là bắt buộc!");
	}else{
        var query = "insert into solieu_thuyvan (idusers, lat, lon, iddistricts, idwards,doman,mucnuoc, ghichu, ngaythunhan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        try {
            localDB.transaction(function(transaction){				
				console.log(lon);
                transaction.executeSql(query, [idusers,lat,lon,iddistricts,idwards,doman,mucnuoc,ghichu,ngaythunhan], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Error: No rows affected.");
                    }
                    else {
                        updateForm_thuyvan("", "", "","","","","","","",true);
						
                        updateStatus("Inserted row with id " + results.insertId);
                        queryAndUpdateOverview_thuyvan();
						removemark();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Error: Unable to perform an INSERT " + e + ".");
        }
    }
}

function onSelect_congtrinh(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");
	
	query = "SELECT * FROM solieu_congtrinh where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm_congtrinh(row['id'], row['idusers'], row['lat'], row['lon'], row['iddistricts'], row['idwards'], row['trangthai'], row['baocaohuhong'], row['ghichu'], row['ngaythunhan'], row['hinh1'], row['hinh2'], row['hinh3'],false);
                
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
   
}

function onSelect_thuyvan(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");
	
	query = "SELECT * FROM solieu_thuyvan where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm_thuyvan(row['id'], row['idusers'], row['lat'], row['lon'], row['iddistricts'], row['idwards'], row['doman'], row['mucnuoc'], row['ghichu'], row['ngaythunhan'],false);
                
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
   
}

function onSelectbtn_congtrinh(id){
	
	query = "SELECT * FROM solieu_congtrinh where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm_congtrinh(row['id'], row['idusers'], row['lat'], row['lon'], row['iddistricts'], row['idwards'], row['trangthai'], row['baocaohuhong'], row['ghichu'], row['ngaythunhan'], row['hinh1'], row['hinh2'], row['hinh3'],false);
				loc2mark(row['lat'],row['lon']);
                
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
   //document.getElementById('thuthap_congtrinh').scrollIntoView();
   menu_click('thuthap_congtrinh');
}

function onSelectbtn_thuyvan(id){
	
	query = "SELECT * FROM solieu_thuyvan where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm_thuyvan(row['id'], row['idusers'], row['lat'], row['lon'], row['iddistricts'], row['idwards'], row['doman'], row['mucnuoc'], row['ghichu'], row['ngaythunhan'],false);
				loc2mark(row['lat'],row['lon']);
                
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
   //document.getElementById('thuthap_thuyvan').scrollIntoView();
   menu_click('thuthap_thuyvan');
}

function queryAndUpdateOverview_congtrinh(){

	//remove old table rows
    var dataRows = document.getElementById("tbody_congtrinh").getElementsByTagName("tr");
	
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("tbody_congtrinh").removeChild(row);
    };
    
	//read db data and create new table rows
    //var query = "SELECT * FROM solieu_congtrinh;";
	var query = "SELECT * FROM solieu_congtrinh_view where idusers=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [IDUSERS], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect_congtrinh(this)");
                    
                    var liText = document.createTextNode(row['idusers'] + " da duoc them vao <<<Click vào để xem");
                    li.appendChild(liText);
					//alert(row['id']);
					
					var str='<tr>';
					str+='<td>'+row['tenwards']+'</td>';
					str+='<td>'+row['ngaythunhan']+'</td>';
					str+='<td><input type="button" name="view" value="Xem" onclick="onSelectbtn_congtrinh('+row['id']+')" class="btn btn-default"/></td>';
					str+='</tr>';
					
					//document.getElementById("itemData").appendChild(li);
					document.getElementById("tbody_congtrinh").innerHTML+=str;
					
                }
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
}

function queryAndUpdateOverview_thuyvan(){

	//remove old table rows
    var dataRows = document.getElementById("tbody_thuyvan").getElementsByTagName("tr");
	
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("tbody_thuyvan").removeChild(row);
    };
    
	//read db data and create new table rows
    //var query = "SELECT * FROM solieu_thuyvan;";
	var query = "SELECT * FROM solieu_thuyvan_view where idusers=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [IDUSERS], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect_thuyvan(this)");
                    
                    var liText = document.createTextNode(row['idusers'] + " da duoc them vao <<<Click vào để xem");
                    li.appendChild(liText);
					//alert(row['id']);
					
					var str='<tr>';
					str+='<td>'+row['tenwards']+'</td>';
					str+='<td>'+row['ngaythunhan']+'</td>';
					str+='<td><input type="button" name="view" value="Xem" onclick="onSelectbtn_thuyvan('+row['id']+')" class="btn btn-default"/></td>';
					str+='</tr>';
					
					//document.getElementById("itemData").appendChild(li);
					document.getElementById("tbody_thuyvan").innerHTML+=str;
					
                }
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
}

// 3. misc utility functions

// db data handler

errorHandler = function(transaction, error){
    updateStatus("Error: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}

// update view functions

function updateForm_congtrinh(id, idusers, lat,lon,iddistricts,idwards,trangthai,baocaohuhong,ghichu,ngaythunhan,hinh1,hinh2,hinh3,isempty){
	//alert('Xa: '+idwards);
    document.frm_congtrinh.id.value = id;
	//document.frm_congtrinh.idusers.value = idusers;
    document.frm_congtrinh.lat.value = lat;
    document.frm_congtrinh.lon.value = lon;
	document.frm_congtrinh.iddistricts.value = iddistricts;
	document.frm_congtrinh.idwards.value = idwards;
	document.frm_congtrinh.trangthai.value = trangthai;
	document.frm_congtrinh.baocaohuhong.value = baocaohuhong;
	document.frm_congtrinh.ghichu.value = ghichu;
	document.frm_congtrinh.ngaythunhan.value = ngaythunhan;
	
	document.frm_congtrinh.hinh1.value = hinh1;
	document.frm_congtrinh.hinh2.value = hinh2;
	document.frm_congtrinh.hinh3.value = hinh3;
	
	if(isempty==true){
		document.getElementById(frm_active+'_hinh1').innerHTML='';
		document.getElementById(frm_active+'_hinh2').innerHTML='';
		document.getElementById(frm_active+'_hinh3').innerHTML='';
	}else{
		document.getElementById(frm_active+'_hinh1').innerHTML='<img src="'+hinh1+'" width="300px">';
		document.getElementById(frm_active+'_hinh2').innerHTML='<img src="'+hinh2+'" width="300px">';
		document.getElementById(frm_active+'_hinh3').innerHTML='<img src="'+hinh3+'" width="300px">';
	}
}

function updateForm_thuyvan(id, idusers, lat,lon,iddistricts,idwards,doman,mucnuoc,ghichu,ngaythunhan,isempty){
	//alert('Xa: '+idwards);
    document.frm_thuyvan.id.value = id;
	//document.frm_thuyvan.idusers.value = idusers;
    document.frm_thuyvan.lat.value = lat;
    document.frm_thuyvan.lon.value = lon;
	document.frm_thuyvan.iddistricts.value = iddistricts;
	document.frm_thuyvan.idwards.value = idwards;
	document.frm_thuyvan.doman.value = doman;
	document.frm_thuyvan.mucnuoc.value = mucnuoc;
	document.frm_thuyvan.ghichu.value = ghichu;
	document.frm_thuyvan.ngaythunhan.value = ngaythunhan;
}

function updateStatus(status){
    document.getElementById('status').innerHTML = status;
}

/*----------------
base64 form upload
-----------------*/
function readURL(input,oput) 
{
    input.style.display = "block";

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            input.src =  e.target.result;
			//console.log(document.getElementById('hinh3upload').src);
			var src=e.target.result;
			document.getElementById(oput).value=src;
			document.getElementById(frm_active+'_'+oput).innerHTML='<img src="'+src+'" width="300px">';
        }

        reader.readAsDataURL(input.files[0]);
    }
}
/*-----------
Post Data
----------*/
function ajaxpost_congtrinh(){
	var idusers = document.frm_congtrinh.idusers.value;
	var lat = document.frm_congtrinh.lat.value;
	var lon = document.frm_congtrinh.lon.value;
	var iddistricts = document.frm_congtrinh.iddistricts.value;
	var idwards = document.frm_congtrinh.idwards.value;
	var trangthai = document.frm_congtrinh.trangthai.value;
	var baocaohuhong = document.frm_congtrinh.baocaohuhong.value;
	var ghichu = document.frm_congtrinh.ghichu.value;
	var ngaythunhan = document.frm_congtrinh.ngaythunhan.value;
	
	var hinh1 = document.frm_congtrinh.hinh1.value;
	var hinh2 = document.frm_congtrinh.hinh2.value;
	var hinh3 = document.frm_congtrinh.hinh3.value;
	
	if ((lat=='')||(lon=="")) {
        //updateStatus("Lỗi: 'Tên' là bắt buộc!");
		updateStatus("Lỗi: Chưa nhập tọa độ vị trí!");
	}else if(iddistricts==''){
		updateStatus("Lỗi: Tên giai đoạn sinh trưởng là bắt buộc!");
	}else if(idwards==''){
		updateStatus("Lỗi: Loại bệnh là bắt buộc!");
	}else{
		today();
		var frm = document.getElementById("frm_congtrinh");
		var urlparam = '';
		var i;
		urlparam+='&app=solieu_congtrinh';
		for (i = 0; i < frm.length; i++){
			urlparam+='&'+frm.elements[i].name+'='+encodeURIComponent(frm.elements[i].value)
		}
		//document.getElementById("status").innerHTML = urlparam;
		document.getElementById("status").innerHTML = '<img src="loading.gif" width="100px">';
		
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			document.getElementById("status").innerHTML=xmlhttp.responseText;
			}
		  }
		xmlhttp.open("POST",urlpost,true);
		//xmlhttp.open("POST","../angianfrm.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(encodeURI(urlparam));
		//document.getElementById("statjs").innerHTML=encodeURI(urlparam)+'<hr>';
	}	
}

function ajaxpost_thuyvan(){
	var idusers = document.frm_thuyvan.idusers.value;
	var lat = document.frm_thuyvan.lat.value;
	var lon = document.frm_thuyvan.lon.value;
	var iddistricts = document.frm_thuyvan.iddistricts.value;
	var idwards = document.frm_thuyvan.idwards.value;
	var doman = document.frm_thuyvan.doman.value;
	var mucnuoc = document.frm_thuyvan.mucnuoc.value;
	var ghichu = document.frm_thuyvan.ghichu.value;
	var ngaythunhan = document.frm_thuyvan.ngaythunhan.value;
	if ((lat=='')||(lon=="")) {
        //updateStatus("Lỗi: 'Tên' là bắt buộc!");
		updateStatus("Lỗi: Chưa nhập tọa độ vị trí!");
	}else if(iddistricts==''){
		updateStatus("Lỗi: Tên giai đoạn sinh trưởng là bắt buộc!");
	}else if(idwards==''){
		updateStatus("Lỗi: Loại bệnh là bắt buộc!");
	}else{
		today();
		var frm = document.getElementById("frm_thuyvan");
		var urlparam = '';
		var i;
		urlparam+='&app=solieu_thuyvan';
		for (i = 0; i < frm.length; i++){
			urlparam+='&'+frm.elements[i].name+'='+encodeURIComponent(frm.elements[i].value)
		}
		//document.getElementById("status").innerHTML = urlparam;
		document.getElementById("status").innerHTML = '<img src="loading.gif" width="100px">';
		
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			document.getElementById("status").innerHTML=xmlhttp.responseText;
			}
		  }
		xmlhttp.open("POST",urlpost,true);
		//xmlhttp.open("POST","../angianfrm.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(encodeURI(urlparam));
		//document.getElementById("statjs").innerHTML=encodeURI(urlparam)+'<hr>';
	}	
}

function clearall(){
	document.frm_congtrinh.id.value='';
    //document.frm_congtrinh.idusers.value='';
	document.frm_congtrinh.lat.value='';
	document.frm_congtrinh.lon.value='';
	document.frm_congtrinh.trangthai.value='';
	document.frm_congtrinh.baocaohuhong.value='';
	document.frm_congtrinh.ghichu.value='';
	//document.frm_congtrinh.iddistricts.value='';
	//document.frm_congtrinh.idwards.value='';
	
	document.frm_congtrinh.hinh1.value='';
	document.frm_congtrinh.hinh2.value='';
	document.frm_congtrinh.hinh3.value='';
	
	//thuyvan
	document.frm_thuyvan.id.value='';
    //document.frm_thuyvan.idusers.value='';
	document.frm_thuyvan.lat.value='';
	document.frm_thuyvan.lon.value='';
	document.frm_thuyvan.doman.value='';
	document.frm_thuyvan.mucnuoc.value='';
	document.frm_thuyvan.ghichu.value='';
	
	document.getElementById(frm_active+'_hinh1').innerHTML='';
	document.getElementById(frm_active+'_hinh2').innerHTML='';
	document.getElementById(frm_active+'_hinh3').innerHTML='';
	
	document.getElementById('status').innerHTML='';
	//document.getElementById('thuthap_congtrinh').scrollIntoView();
	//menu_click('thuthap_congtrinh');
	//menu_click('thuthap_thuyvan');
	removemark();
}

function menu_click(div){
	var thuthap_congtrinh_div = document.getElementById("thuthap_congtrinh");
	var dulieu_congtrinh_div = document.getElementById("dulieu_congtrinh");
	//thuyvan
	var thuthap_thuyvandiv = document.getElementById("thuthap_thuyvan");
	var dulieu_thuyvandiv = document.getElementById("dulieu_thuyvan");
	
	var huongdandiv = document.getElementById("huongdan");
	var dangnhapdiv = document.getElementById("dangnhap");
	
	thuthap_congtrinh_div.style.display = "none";
	dulieu_congtrinh_div.style.display = "none";
	//thuyvan
	thuthap_thuyvandiv.style.display = "none";
	dulieu_thuyvandiv.style.display = "none";
	
	huongdandiv.style.display = "none";
	dangnhapdiv.style.display = "none";
	
	document.getElementById(div).style.display = "block";
	
	/*
	var apptitle=document.getElementById('menu_'+div).innerHTML;
	//console.log(apptitle);
	$('#apptitle').html(apptitle);
	*/
	switch(div) {
		case 'thuthap_congtrinh':
			var apptitle='Thu thập';
			frm_active='frm_congtrinh';
			break;
		case 'dulieu_congtrinh':
			var apptitle='Dữ liệu';
			break;
		//thuyvan
		case 'thuthap_thuyvan':
			var apptitle='Thu thập';
			frm_active='frm_thuyvan';
			break;
		case 'dulieu_thuyvan':
			var apptitle='Dữ liệu';
			break;
		case 'huongdan':
			var apptitle='Trợ giúp';
			break;
		case 'dangnhap':
			var apptitle='Đăng nhập';
			break;
		default:
			var apptitle='Nông nghiệp An Giang';
	}
	$('#apptitle').html(apptitle);
}
function page_default(){
	var thuthap_congtrinh_div = document.getElementById("thuthap_congtrinh");
	var dulieu_congtrinh_div = document.getElementById("dulieu_congtrinh");
	//thuyvan
	var thuthap_thuyvandiv = document.getElementById("thuthap_thuyvan");
	var dulieu_thuyvandiv = document.getElementById("dulieu_thuyvan");
	
	var huongdandiv = document.getElementById("huongdan");
	var dangnhapdiv = document.getElementById("dangnhap");
	
	thuthap_congtrinh_div.style.display = "none";
	dulieu_congtrinh_div.style.display = "none";
	//thuyvan
	thuthap_thuyvandiv.style.display = "none";
	dulieu_thuyvandiv.style.display = "none";
	
	huongdandiv.style.display = "none";
	dangnhapdiv.style.display = "none";
	
	//loadapp_count
	if(getCookie('loadapp_count')==0){
		document.getElementById("dangnhap").style.display = "block";
		var login_cookie=getCookie('login');
		if(login_cookie=='true'){
			//thuthap_congtrinh_div.style.display = "none";
			//thuthap_congtrinh_div = document.getElementById("thuthap_congtrinh")
			document.getElementById('login_fieldset').style.display = "none";
			$('#messdiv').fadeIn();
			var login_success_txt='Đăng nhập thành công.';
			FULLNAME=getCookie('fullname');
			EMAIL=getCookie('email');
			IDUSERS=getCookie('id');
			var login_classdiv=getCookie('login_classdiv');
			//login_success_txt+=readCookie('fullname').'<br>';
			//login_success_txt+=readCookie('email').'<br>';
			$('#messdiv').html(login_success_txt);
			$('#messdiv2').html('<h3>'+FULLNAME+'<br>'+EMAIL+'</h3>');
			document.getElementById('messdiv').className=login_classdiv;
			$('#user_info_div').html('<div style="font-size: 18px;">'+FULLNAME+'</div><div style="font-size: 15px;">'+EMAIL+'</div>');
		}
	}else{
		document.getElementById("thuthap_congtrinh").style.display = "block";
		//document.getElementById("thuthap_thuyvan").style.display = "block";
	}
	
}