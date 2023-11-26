window.onload = function(){
    var cur_date = new Date;
    var cur_year = cur_date.getFullYear();
    var cur_month = cur_date.getMonth()+1;
    var cur_day = cur_date.getUTCDate();
    var year_before = cur_year - 3;
    if(cur_month<10){
        cur_month = "0"+cur_month;
    }
    if(cur_day<10){
        cur_day = "0"+cur_day;
    }
    document.getElementById("date_debut").value = year_before;
    document.getElementById("date_fin").value = cur_month+"/"+cur_year;
    document.getElementById("current_date").innerHTML += cur_year+"/"+cur_month+"/"+cur_day;
}

var total = 0;
var all_year = [];
var nb_m = Array();
var calcul_par_annee = Array();
var habitat_R_plus_2_tarif = Array(4,6,4,8);
var habitat_R_plus_3_tarif = Array(2,12,4,8);
var individuel_tarif = Array(4,6,5,6);
var villa_tarif = Array(2,6,6,6);
var autre_tarif = Array(4,6,6,6);
var current_date = new Date;
var isChecked = document.getElementById("NowOrBefore");

function disable_check_box_now_Or_before(){
    var cur_year = current_date.getFullYear();

    var dateF = document.getElementById("date_fin").value;
    if(dateF.slice(3) == cur_year && dateF.slice(0,2) == "01" || dateF.slice(3) == cur_year && dateF.slice(0,2) == "02"){
        document.getElementById("NowOrBefore").checked = false;
        document.getElementById("NowOrBefore").disabled = true;
    }else{
        document.getElementById("NowOrBefore").disabled = false;
    }
}
setInterval(disable_check_box_now_Or_before,1000);

function checkIsDateStartWithZero(){
    date_f = document.getElementById("date_fin").value;
    if(date_f.length <= 6){
        document.getElementById("date_fin").value = "0"+date_f
    }
}

function get_year_diff(date1, date2) {
    year_date2 = date2.slice(3);
    return year_date2 - date1 + 1;
}

function nb_mois(date1, date2){
    var nb_month_retard = Array();
    var nb_years = current_date.getFullYear() - date1 + 1;
    var month = current_date.getMonth() + 1;
    if(date2.slice(3) >= current_date.getFullYear()){
        nb_years = date2.slice(3) - date1 + 1;
        month = date2.slice(0,2);
    }else if(date2.slice(3) < current_date.getFullYear() && isChecked.checked == true){
        nb_years = date2.slice(3) - date1 + 1;
        month = date2.slice(0,2);
    }
    
    for(let i=0; i<nb_years; i++){
        if(i == 0){
            if(month==0o1 || month==0o2){
                nb_month_retard.push(0);
            }else{
                nb_month_retard.push(month - 3);
            }
        }else if(i != 0){
            nb_month_retard.push((month - 3) + 12 * i);
        }
        //alert("i = "+i+" nbMois = "+nb_month_retard+" nb_years = "+nb_years);
        //alert("date 2  "+date2+" current = "+current_date);
    }
    return nb_month_retard;
}

function calcule_penalite_15(_montant, _year){
    date_fin = document.getElementById("date_fin").value;
    var year_fin = date_fin.slice(3);
    var month_fin = date_fin.slice(0,2);
    year = _year;
    if(year > current_date.getFullYear()){
        if(year < year_fin){
            return _montant * 15 / 100 > 500 ? _montant * 15 / 100 : 500;
        }else if(year == year_fin){
            if(month_fin == 0o2 || month_fin == 0o1){
                return 0;
            }else{
                return _montant * 15 / 100 > 500 ? _montant * 15 / 100 : 500;
            }
        }
    }else if(year == year_fin && year_fin < current_date.getFullYear() && isChecked.checked == true){
        if(month_fin == "01" || month_fin == "02"){
            return 0;
        }else{
            return _montant * 15 / 100 > 500 ? _montant * 15 / 100 : 500;
        }
    }else if(year == year_fin && year_fin < current_date.getFullYear()){
        return _montant * 15 / 100 > 500 ? _montant * 15 / 100 : 500;
    }else if(year == year_fin){
        if(month_fin == "01" || month_fin =="02"){
            return 0;
        }else{
            return _montant * 15 / 100 > 500 ? _montant * 15 / 100 : 500;
        }
    }else{
        return _montant * 15 / 100 > 500 ? _montant * 15 / 100 : 500;
    }
}

function calcule_penalite_10(_montant, _year){
    date_fin = document.getElementById("date_fin").value;
    var year_fin = date_fin.slice(3);
    var month_fin = date_fin.slice(0,2);
    year = _year;
    if(year > current_date.getFullYear()){
        if(year < year_fin){
            return _montant * 10 / 100;
        }else if(year == year_fin){
            if(month_fin == 0o2 || month_fin == 0o1){
                return 0;
            }else{
                return _montant * 10 / 100;
            }
        }
    }else if(year == year_fin && year_fin < current_date.getFullYear() && isChecked.checked == true){
        if(month_fin == "01" || month_fin == "02"){
            return 0;
        }else{
            return _montant * 10 / 100;
        }
    }else if(year == year_fin && year_fin < current_date.getFullYear()){
        return _montant * 10 / 100;
    }else if(year == year_fin){
        if(month_fin == "01" || month_fin =="02"){
            return 0;
        }else{
            return _montant * 10 / 100;
        }
    }else{
        return _montant * 10 / 100;
    }
}

function calcule_penalite_5(_montant, _year){
    date_fin = document.getElementById("date_fin").value;
    var year_fin = date_fin.slice(3);
    var month_fin = date_fin.slice(0,2);
    year = _year;
    if(year > current_date.getFullYear()){
        if(year < year_fin){
            return _montant * 5 / 100;
        }else if(year == year_fin){
            if(month_fin == 0o2 || month_fin == 0o1){
                return 0;
            }else{
                return _montant * 5 / 100;
            }
        }
    }else if(year == year_fin && year_fin < current_date.getFullYear() && isChecked.checked == true){
        if(month_fin == "01" || month_fin == "02"){
            return 0;
        }else{
            return _montant * 5 / 100;
        }
    }else if(year == year_fin && year_fin < current_date.getFullYear()){
        return _montant * 5 / 100;
    }else if(year == year_fin){
        if(month_fin == "01" || month_fin =="02"){
            return 0;
        }else{
            return _montant * 5 / 100;
        }
    }else{
        return _montant * 5 / 100;
    }
}

function calcule_penalite_05(_montant, _year){
    date_fin = document.getElementById("date_fin").value;
    var year_fin = date_fin.slice(3);
    var month_fin = date_fin.slice(0,2);
    year = _year;
    if(year > current_date.getFullYear()){
        if(year < year_fin){
            return _montant * 0.5 / 100;
        }else if(year == year_fin){
            if(month_fin == 0o2 || month_fin == 0o1){
                return 0;
            }else{
                return _montant * 0.5 / 100;
            }
        }
    }else if(year == year_fin && year_fin < current_date.getFullYear() && isChecked.checked == true){
        if(month_fin == "01" || month_fin == "02"){
            return 0;
        }else{
            return _montant * 0.5 / 100;
        }
    }else if(year == year_fin && year_fin < current_date.getFullYear()){
        return _montant * 0.5 / 100;
    }else if(year == year_fin){
        if(month_fin == "01" || month_fin =="02"){
            return 0;
        }else{
            return _montant * 0.5 / 100;
        }
    }else{
        return _montant * 0.5 / 100;
    }
}

function calculer(){
    total = 0;
    date_debut = parseInt(document.getElementById("date_debut").value);
    date_fin = document.getElementById("date_fin").value;
    surface = document.getElementById("surface").value;
    tarif = document.getElementById("tarif").value;
    calcul_par_annee = [];
    totaux_des_montants = [];
    totaux_des_montants["total montant"] = 0;
    totaux_des_montants["total penalite 15 %"] = 0;
    totaux_des_montants["total penalite 10 %"] = 0;
    totaux_des_montants["total penalite 5 %"] = 0;
    totaux_des_montants["total mois de retard"] = 0;
    totaux_des_montants["total penalite 0.5 %"] = 0;
    //alert(date_debut+" / "+date_fin+" / "+surface+" / "+tarif);
    var date_diff = get_year_diff(date_debut,date_fin);
    if(tarif == "habitatR2"){
        nb_m = [];
        nb_m = nb_mois(date_debut, date_fin);
        for(var i=0; i<date_diff; i++){
            //alert(date_debut+i +"/////"+ i);
            if(date_debut+i < 2018){
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = habitat_R_plus_2_tarif[0];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["mois de retard"] -= 3;
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2018 && date_debut+i <= 2022){
                //alert("date est entre 2018 et 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                if(date_debut+i <= 2020){
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = habitat_R_plus_2_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["mois de retard"] -= 3;
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }else{
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = habitat_R_plus_2_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }
            }else if(date_debut+i == 2023){
                //alert("date est > 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = habitat_R_plus_2_tarif[2];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2023){
                //alert("date est > 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = habitat_R_plus_2_tarif[3];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }
        }
    }else if(tarif == "habitatR3"){
        nb_m = [];
        nb_m = nb_mois(date_debut, date_fin);
        for(var i=0; i<date_diff; i++){
            //alert(date_debut+i +"/////"+ i);
            if(date_debut+i < 2018){
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = habitat_R_plus_3_tarif[0];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["mois de retard"] -= 3;
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2018 && date_debut+i <= 2022){
                //alert("date est entre 2018 et 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                if(date_debut+i <= 2020){
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = habitat_R_plus_3_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["mois de retard"] -= 3;
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }else{
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = habitat_R_plus_3_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }
            }else if(date_debut+i == 2023){
                //alert("date est > 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = habitat_R_plus_3_tarif[2];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2023){
                //alert("date est > 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = habitat_R_plus_3_tarif[3];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }
        }
    }else if(tarif == "individuel"){
        nb_m = [];
        nb_m = nb_mois(date_debut, date_fin);
        for(var i=0; i<date_diff; i++){
            //alert(date_debut+i +"/////"+ i);
            if(date_debut+i < 2018){
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = individuel_tarif[0];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["mois de retard"] -= 3;
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2018 && date_debut+i <= 2022){
                //alert("date est entre 2018 et 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                if(date_debut+i <= 2020){
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = individuel_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["mois de retard"] -= 3;
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }else{
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = individuel_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }
            }else if(date_debut+i == 2023){
                //alert("date est > 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = individuel_tarif[2];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2023){
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = individuel_tarif[3];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }
        }
    }else if(tarif == "villa"){
        nb_m = [];
        nb_m = nb_mois(date_debut, date_fin);
        for(var i=0; i<date_diff; i++){
            //alert(date_debut+i +"/////"+ i);
            if(date_debut+i < 2018){
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = villa_tarif[0];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["mois de retard"] -= 3;
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2018 && date_debut+i <= 2022){
                //alert("date est entre 2018 et 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                if(date_debut+i <= 2020){
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = villa_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["mois de retard"] -= 3;
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }else{
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = villa_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }
            }else if(date_debut+i == 2023){
                //alert("date est > 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = villa_tarif[2];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2023){
                //alert("date est > 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = villa_tarif[3];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }
        }
    }else if(tarif == "autre"){
        nb_m = [];
        nb_m = nb_mois(date_debut, date_fin);
        for(var i=0; i<date_diff; i++){
            //alert(date_debut+i +"/////"+ i);
            if(date_debut+i < 2018){
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = autre_tarif[0];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["mois de retard"] -= 3;
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2018 && date_debut+i <= 2022){
                //alert("date est entre 2018 et 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                if(date_debut+i <= 2020){
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = autre_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["mois de retard"] -= 3;
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }else{
                    calcul_par_annee[i] = new Array(10);
                    calcul_par_annee[i]["annee"] = date_debut+i;
                    calcul_par_annee[i]["surface"] = surface;
                    calcul_par_annee[i]["tarif"] = autre_tarif[1];
                    calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                    calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                    calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                    calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                    //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                    //alert("tarif " + calcul_par_annee[i][2]);
                    calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                    //alert(parseFloat(calcul_par_annee[i][9]));
                    totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                    totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                    totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                    totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                    totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                    totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
                }
            }else if(date_debut+i == 2023){
                //alert("date est > 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = autre_tarif[2];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }else if(date_debut+i >= 2023){
                //alert("date est > 2022");
                date_debut = parseInt(document.getElementById("date_debut").value);
                calcul_par_annee[i] = new Array(10);
                calcul_par_annee[i]["annee"] = date_debut+i;
                calcul_par_annee[i]["surface"] = surface;
                calcul_par_annee[i]["tarif"] = autre_tarif[3];
                calcul_par_annee[i]["montant"] = parseFloat(surface * calcul_par_annee[i]["tarif"]);
                calcul_par_annee[i]["penalite 15 %"] = parseFloat(calcule_penalite_15(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 10 %"] = parseFloat(calcule_penalite_10(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["penalite 5 %"] = parseFloat(calcule_penalite_5(calcul_par_annee[i]["montant"], date_debut+i));
                calcul_par_annee[i]["mois de retard"] = nb_m.pop();
                calcul_par_annee[i]["penalite 0.5 %"] = parseFloat(calcule_penalite_05(calcul_par_annee[i]["montant"], date_debut+i) * calcul_par_annee[i]["mois de retard"]);
                //alert(parseFloat(calcule_penalite_05(calcul_par_annee[i][3])));
                //alert("tarif " + calcul_par_annee[i][2]);
                calcul_par_annee[i]["total"] = parseFloat(calcul_par_annee[i]["montant"] + calcul_par_annee[i]["penalite 15 %"] + calcul_par_annee[i]["penalite 10 %"] + calcul_par_annee[i]["penalite 5 %"] + calcul_par_annee[i]["penalite 0.5 %"]);
                //alert(parseFloat(calcul_par_annee[i][9]));
                totaux_des_montants["total montant"] += parseFloat(calcul_par_annee[i]["montant"]);
                totaux_des_montants["total penalite 15 %"] += parseFloat(calcul_par_annee[i]["penalite 15 %"]);
                totaux_des_montants["total penalite 10 %"] += parseFloat(calcul_par_annee[i]["penalite 10 %"]);
                totaux_des_montants["total penalite 5 %"] += parseFloat(calcul_par_annee[i]["penalite 5 %"]);
                totaux_des_montants["total penalite 0.5 %"] += parseFloat(calcul_par_annee[i]["penalite 0.5 %"]);
                totaux_des_montants["total mois de retard"] += parseFloat(calcul_par_annee[i]["mois de retard"]);
            }
        }
    }

    // Affichage

    var zone_affichage = document.getElementById("zone_affichage");
    var output_total = document.getElementById("total");
    var output_total_Cts = document.getElementById("totalEnCts");
    zone_affichage.innerHTML = "";
    output_total.innerHTML = "المبلغ الإجمالي : ";
    for(let k=0; k<date_diff; k++){
        var total_penalites = calcul_par_annee[k]["penalite 15 %"]+calcul_par_annee[k]["penalite 10 %"]+calcul_par_annee[k]["penalite 5 %"]+calcul_par_annee[k]["penalite 0.5 %"];
        var total_total_penalites = totaux_des_montants["total penalite 15 %"] + totaux_des_montants["total penalite 10 %"] + totaux_des_montants["total penalite 5 %"] + totaux_des_montants["total penalite 0.5 %"];
        var content = "<tr> <td style='width:15px'> <input type='checkbox' class='checkAll' onchange='verify("+k+")' id='"+k+"'></td> <td>"
            +calcul_par_annee[k]["annee"]+"</td> <td>"
            +calcul_par_annee[k]["surface"]+"</td> <td>"
            +calcul_par_annee[k]["tarif"].toFixed(2)+"</td> <td class='exonere'>"
            +calcul_par_annee[k]["montant"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
            +calcul_par_annee[k]["penalite 15 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
            +calcul_par_annee[k]["penalite 10 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
            +calcul_par_annee[k]["penalite 5 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
            +calcul_par_annee[k]["mois de retard"]+"</td> <td class='d-none d-sm-table-cell'>"
            +calcul_par_annee[k]["penalite 0.5 %"].toFixed(2)+"</td> <td>"
            +total_penalites.toFixed(2)+"</td> <td>"
            +calcul_par_annee[k]["total"].toFixed(2)+"</td> </tr>";
            total = total + calcul_par_annee[k]["total"];
            zone_affichage.innerHTML += content;
    }
    var total_content = "<tr class='bg-warning'> <td colspan='2'> المجموع: </td> <td>------</td> <td>------</td> <td class='exonere'>"
        +totaux_des_montants["total montant"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total penalite 15 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total penalite 10 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total penalite 5 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total mois de retard"]+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total penalite 0.5 %"].toFixed(2)+"</td> <td>"
        +total_total_penalites.toFixed(2)+"</td> <td>"
        +total.toFixed(2)+"</td> </tr>";
    output_total.innerHTML += total.toFixed(2);
    zone_affichage.innerHTML += total_content;
    //output_total_Cts.innerText = parseFloat(total*20);
    //console.table(calcul_par_annee);
}

function printContent(){
    document.getElementById("hidden").style.display="none";
    window.print();
    document.getElementById("hidden").style.display="block";
}

function verify(pos){
    date_debut = parseInt(document.getElementById("date_debut").value);
    date_fin = document.getElementById("date_fin").value;
    var date_diff = get_year_diff(date_debut,date_fin);
    var ch = document.getElementById(pos);
    var total_total_penalites = totaux_des_montants["total penalite 15 %"] + totaux_des_montants["total penalite 10 %"] + totaux_des_montants["total penalite 5 %"] + totaux_des_montants["total penalite 0.5 %"];
    if(ch.checked){
        totaux_des_montants["total penalite 15 %"] -= calcul_par_annee[pos]["penalite 15 %"];
        calcul_par_annee[pos]["penalite 15 %"] = 0;
        var zone_affichage = document.getElementById("zone_affichage");
        var output_total = document.getElementById("total");
        zone_affichage.innerHTML = "";
        output_total.innerHTML = "المبلغ الإجمالي : ";
        var total = 0;
        for(let k=0; k<date_diff; k++){
            var total_penalites = calcul_par_annee[k]["penalite 15 %"]+calcul_par_annee[k]["penalite 10 %"]+calcul_par_annee[k]["penalite 5 %"]+calcul_par_annee[k]["penalite 0.5 %"];
            var total_par_annee = calcul_par_annee[k]["montant"]+calcul_par_annee[k]["penalite 15 %"]+calcul_par_annee[k]["penalite 10 %"]+calcul_par_annee[k]["penalite 5 %"]+calcul_par_annee[k]["penalite 0.5 %"];
            var content = "<tr> <td style='width:15px'> <input type='checkbox' class='checkAll' onchange='verify("+k+")' id='"+k+"'></td> <td>"
                +calcul_par_annee[k]["annee"]+"</td> <td>"
                +calcul_par_annee[k]["surface"]+"</td> <td>"
                +calcul_par_annee[k]["tarif"].toFixed(2)+"</td> <td class='exonere'>"
                +calcul_par_annee[k]["montant"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["penalite 15 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["penalite 10 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["penalite 5 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["mois de retard"]+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["penalite 0.5 %"].toFixed(2)+"</td> <td>"
                +total_penalites.toFixed(2)+"</td> <td>"
                +total_par_annee.toFixed(2)+"</td> </tr>";
                total += total_par_annee;
                zone_affichage.innerHTML += content;
                if(calcul_par_annee[k]["penalite 15 %"] == 0 && calcul_par_annee[k]["penalite 10 %"] != 0){
                    document.getElementById(k).setAttribute("checked", "checked");
                }
        }
        output_total.innerHTML += total.toFixed(2);
    }else if(!ch.checked){
        calcul_par_annee[pos]["penalite 15 %"] = calcule_penalite_15(calcul_par_annee[pos]["montant"],calcul_par_annee[pos]["annee"]);
        totaux_des_montants["total penalite 15 %"] += calcul_par_annee[pos]["penalite 15 %"];
        var zone_affichage = document.getElementById("zone_affichage");
        var output_total = document.getElementById("total");
        zone_affichage.innerHTML = "";
        output_total.innerHTML = "المبلغ الإجمالي : ";
        var total = 0;
        for(let k=0; k<date_diff; k++){
            var total_penalites = calcul_par_annee[k]["penalite 15 %"]+calcul_par_annee[k]["penalite 10 %"]+calcul_par_annee[k]["penalite 5 %"]+calcul_par_annee[k]["penalite 0.5 %"];
            var total_par_annee = calcul_par_annee[k]["montant"]+calcul_par_annee[k]["penalite 15 %"]+calcul_par_annee[k]["penalite 10 %"]+calcul_par_annee[k]["penalite 5 %"]+calcul_par_annee[k]["penalite 0.5 %"];
            var content = "<tr> <td style='width:15px'> <input type='checkbox' class='checkAll' onchange='verify("+k+")' id='"+k+"'></td> <td>"
                +calcul_par_annee[k]["annee"]+"</td> <td>"
                +calcul_par_annee[k]["surface"]+"</td> <td>"
                +calcul_par_annee[k]["tarif"].toFixed(2)+"</td> <td class='exonere'>"
                +calcul_par_annee[k]["montant"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["penalite 15 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["penalite 10 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["penalite 5 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["mois de retard"]+"</td> <td class='d-none d-sm-table-cell'>"
                +calcul_par_annee[k]["penalite 0.5 %"].toFixed(2)+"</td> <td>"
                +total_penalites.toFixed(2)+"</td> <td>"
                +total_par_annee.toFixed(2)+"</td> </tr>";
                total += total_par_annee;
                zone_affichage.innerHTML += content;
                if(calcul_par_annee[k]["penalite 15 %"] == 0 && calcul_par_annee[k]["penalite 10 %"] != 0){
                    document.getElementById(k).setAttribute("checked", "checked");
                }else if(calcul_par_annee[k]["penalite 15 %"] != 0){
                    document.getElementById(k).removeAttribute("checked");
                }
        }
        output_total.innerHTML += total.toFixed(2);
    }
    var total_content = "<tr class='bg-warning'> <td colspan='2'> المجموع: </td> <td>------</td> <td>------</td> <td class='exonere'>"
        +totaux_des_montants["total montant"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total penalite 15 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total penalite 10 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total penalite 5 %"].toFixed(2)+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total mois de retard"]+"</td> <td class='d-none d-sm-table-cell'>"
        +totaux_des_montants["total penalite 0.5 %"].toFixed(2)+"</td> <td>"
        +total_total_penalites.toFixed(2)+"</td> <td>"
        +total.toFixed(2)+"</td> </tr>";
    zone_affichage.innerHTML += total_content;
}

/*function viewCts(){
    alert(parseFloat(total*20)+" سنتيم");
}*/