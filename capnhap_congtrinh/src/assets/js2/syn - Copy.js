function load_users(){
	var url=urlsyn+'?tbl=users';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM users',[]);
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
function load_districts(){
	var url=urlsyn+'?tbl=districts';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM districts',[]);
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var tendistricts=data[i].tendistricts;
				var iddistricts=data[i].iddistricts;
                transaction.executeSql('INSERT INTO districts (id,tendistricts,iddistricts) VALUES (?,?,?)',[id,tendistricts,iddistricts]);
            }
        });
    });
}
function load_wards(){
	var url=urlsyn+'?tbl=wards';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM wards',[]);
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var tenwards=data[i].tenwards;
				var iddistricts=data[i].iddistricts;
				var idwards=data[i].idwards;
                transaction.executeSql('INSERT INTO wards (id,tenwards,iddistricts,idwards) VALUES (?,?,?,?)',[id,tenwards,iddistricts,idwards]);
            }
        });
    });
}
function load_solieu_congtrinh(){
	var url=urlsyn+'?tbl=solieu_congtrinh';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM solieu_congtrinh',[]);
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var trangthai=data[i].trangthai;
                var baocaohuhong=data[i].baocaohuhong;
				var idhuyen=data[i].idhuyen;
				var idxa=data[i].idxa;
				var lon=data[i].lon;
				var lat=data[i].lat;
				var idusers=data[i].idusers;
				var ngaythunhan=data[i].ngaythunhan;
                //console.log('we insert ' + ten);
                transaction.executeSql('INSERT INTO solieu_congtrinh (id,trangthai,baocaohuhong,idhuyen,idxa,lon,lat,idusers,ngaythunhan) VALUES (?,?,?,?,?,?,?,?,?)',[id,trangthai,baocaohuhong,mota,idhuyen,idxa,lon,lat,idusers,ngaythunhan]);
            }
        });
    });
}

