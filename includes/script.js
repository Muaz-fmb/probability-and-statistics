// 1. basit rasgele örnekleme       || DON
// 2. sistematik rasgele örnekleme
// 3. basit seri
// 4. frekans seri ( slayt 20 / hafta 1-1 )
// 5. frekans tablosu 
// 6. merkezi eğilim ölçüleri 
// 7. dağılım ölçüleri
// 8. kombinasyon permütasyon

//  1.5 1.5 2.6 2.6 3.4 3.8 3.8 4.1 4.1 4.6 4.6 4.6 5.2 5.2
// 81 89 116 130 168 170 192 203 224 226 249 345 364 367 424 456 464 544 548 557 586 592 601 623 643 801 831 842 854 921 940 1020 1080 1100 1130 1350 1520 1850 1850 2030

var unarrangedItems = [];
var arrangedItems = [];

// For calculating Q1 and Q3 
var sinifFrekansValues = [];
var sinifAltSinirlarValues = [];
var sinifwidth = 0;



function insertNewItem(){    


    var newItems = document.getElementById('newItemInput').value;
    // document.getElementById("newItemInput").value = null;
    if(newItems == null || newItems ==''){
        return 0;
    }
    unarrangedItems = newItems.split(" ");


    // display the resute areya 
    displayTheResultArea();

    // dislaying the unorded item array
    displayUnorderdItems();

    // ordering the items and desplaying them
    displayedorderdItems();


}


function displayTheResultArea(){
     // display the resute areya 
    var element = document.getElementById("resultContainer");
    var element2 = document.getElementById("resultContainers");

    element.classList.remove("displaynon");

    if(unarrangedItems.length != 0 ){
        element2.classList.remove("displaynon");

    }
}

// unarrenged Mass (girilen Seri)
function displayUnorderdItems(){
     // unorded item array
     var displayedUnorderdItems = [];
     unarrangedItems.forEach(function(item) {
         displayedUnorderdItems += '<span class="p-r">' + item + '</span>';
       });
     document.getElementById("unorderdArrayPlace").innerHTML = displayedUnorderdItems;
}

//  Arrenged Mass (Basit Seri)
function displayedorderdItems(){
    // debugger;

    // ordering the items and desplaying them
    var orderdListItem = [...unarrangedItems].sort(function(a, b){return a-b});
    arrangedItems = [...unarrangedItems].sort(function(a, b){return a-b});

    var displayedorderdItems = [];
    orderdListItem.forEach(function(item) {
        displayedorderdItems += '<span class="p-r">' + item + '</span>';
      });
    document.getElementById("orderdArrayPlace").innerHTML = displayedorderdItems;
}

// Simple Random Sampling (Basit Rastgele örnekleme)
function simpleRandomSampling(){
    // simpleRandomSamplingPlace
    var randItemNumber = document.getElementById('randomSampleNumberID').value;
    document.getElementById("randomSampleNumberID").value = null;
    var randomItems = [];

    if(randItemNumber > unarrangedItems.length){ 
        randomItems+= '<span class="p-r"> girdiğiniz sayı kütleden büyük, kütleden daha küçük giriniz. </span>';
        document.getElementById("simpleRandomSamplingPlace").innerHTML = randomItems;
        return 0;
    }else{
        for (let i = 0; i < randItemNumber; i++) {
            const random = Math.floor(Math.random() * unarrangedItems.length);
            randomItems+= '<span class="p-r">' + unarrangedItems[random] + '</span>';
        }
    }

    document.getElementById("simpleRandomSamplingPlace").innerHTML = randomItems;
}

// Systematic Random Sampling (Sistematik Rastgele örnekleme)
function SystematicRandomSampling(){
    // debugger;
    // general mass / genel kutle
    var N = unarrangedItems.length;
    // sample number / ornekleme sayisi
    var smalln  = document.getElementById("systematicSampleNumberID").value;
    var K = Math.floor( N / smalln );
    var random = Math.floor(Math.random() * K);
    var systematicRandomItems = [];

    if(smalln  > N){
        systematicRandomItems+= '<span class="p-r"> Girdiğiniz numarayı kütleden daha büyüktür.</span>';
        document.getElementById("systematicRandomSamplingPlace").innerHTML = systematicRandomItems;
        return;
    }

    for(var i = 0; i < smalln ; i++){
        systematicRandomItems+= '<span class="p-r">'  + unarrangedItems[random] + '</span>';
        random += K;
    }
    document.getElementById("systematicRandomSamplingPlace").innerHTML = systematicRandomItems;
}

//  Central Tendency Measures (Mrkezi Eğilim Ölçüleri)
function centralTrendencyMesures(){
    //  calculate the average
    var sum = 0;

    arrangedItems.forEach(function myfunc(item){

        sum += parseFloat(item);
    });
    var avg = sum / unarrangedItems.length ;
    document.getElementById("ortalama").innerHTML = avg.toFixed(2);

    //  calculate the median
    var median =  0;
    const isEven = arrangedItems.length % 2 === 0;
    if(isEven){
        median = (parseFloat(arrangedItems[(arrangedItems.length /2) -1]) + parseFloat(arrangedItems[(arrangedItems.length /2)] )) / 2 ;
    }
    else{
        median = parseFloat(arrangedItems[Math.floor(arrangedItems.length / 2)]);
    }
    document.getElementById("mediyan").innerHTML = median.toFixed(2);


    // calculate the mode
    var modes = getModes(arrangedItems);
    var finalmodes = 0;
    for (let i = 0; i < modes.length; i++) {
        if(finalmodes == 0){
            finalmodes = '<span class="p-r">' + modes[i] + '</span>';
        }else{
            finalmodes+= '<span class="p-r">' + modes[i] + '</span>';
        }
    }
    document.getElementById("mod").innerHTML = finalmodes;


}

// calculate the modes 
function getModes(array) {
    var frequency = []; // array of frequency.
    var maxFreq = 0; // holds the max frequency.
    var modes = [];
  
    for (var i in array) {
      frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.
  
      if (frequency[array[i]] > maxFreq) { // is this frequency > max so far ?
        maxFreq = frequency[array[i]]; // update max.
      }
    }
    for (var k in frequency) {
      if (frequency[k] == maxFreq) {
        modes.push(k);
      }
    }
  
    return modes;
  }

//  Calculate Frequenc serise (frekans serisi)
  function calculateSimpleFrequency(){

    var tableContent = [];
    const counts = {};
    for (const num of arrangedItems) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    for(var key in counts){
        tableContent +=  '<tr><th scope="row">'+ key +'</th><td>'+ counts[key] +'</td></tr>';
        // console.log(key + " => " +counts[key]);
    }
    if(arrangedItems.length != 0 ){
        document.getElementById("frequencyTableContent").innerHTML = tableContent;
    }
  }

// calculate frequency table
  function calculateFrequencyTable(){
    // 1. Gözlemlerin sayısı 
    var n = arrangedItems.length;
    // 2. En büyük değer (L) ve en küçük değer (S) arasındaki fark 
    var R = arrangedItems[arrangedItems.length-1] - arrangedItems[0];
    // 3. Sınıf sayısı (k) 
    var K = Math.ceil(Math.sqrt(n));
    // 4. Sınıf genişliği
    var h = Math.ceil(R/ K);
    sinifwidth = h;

    // 5. sinif limitleri hesapla 
    var limitUst = (parseFloat(arrangedItems[0]) + parseFloat(h) -0.1);
    var limitAlt = arrangedItems[0];
    var classLimits = [];
  
    // 6. sinif sinirlri hesapla 
    var sinirUst = (parseFloat(limitUst) + parseFloat(limitAlt) +parseFloat(h))/2;
    var sinirAlt = (parseFloat(sinirUst) - h).toFixed(2);
    var classSinirs = [];

    // // 7. sinif frekans hesapla ve 10. oransal frekans hesaplama
    let oransalFrekans = [];
    var sinifFrekans = [];

    // 8. sinif ortalama noktasi 
    var sinifOrtalamaNoktasi = [];

    // 9. eklenik freakans hesapla ve 11. oransal eklenik frekanslar
    let eklenicFrecansItems = [];
    var eklaneikFreakans = [];
    let oransalEklenikFrekanslar = [] ;

   for(var i = 0; i < K ; i++){
    var counter = 0;
    let counterforEkleniFrekans = 0;

        if(i == K-1){
            classLimits += "<tr><td>"+ (parseFloat(limitAlt)+(h * i)) +"</td><td>"+ (parseFloat(limitUst)+(h * i)+0.1) +"</td></tr>";
            arrangedItems.forEach(function myfunc(item){
                if(item >= (parseFloat(limitAlt)+(h * i)) && item <= (parseFloat(limitUst)+(h * i + 0.1)) ){
                    counter += 1;
                    counterforEkleniFrekans += 1;
                }
            });
        }else{
            classLimits += "<tr><td>"+ (parseFloat(limitAlt)+(h * i)) +"</td><td>"+ (parseFloat(limitUst)+(h * i)) +"</td></tr>";
            arrangedItems.forEach(function myfunc(item){
                if(item >= (parseFloat(limitAlt)+(h * i)) && item <= (parseFloat(limitUst)+(h * i)) ){
                    counter += 1;
                    counterforEkleniFrekans += 1;
                }
            });

        }

        if(eklenicFrecansItems.length == 0){
            eklenicFrecansItems.push(counterforEkleniFrekans); 
        }else{
            eklenicFrecansItems.push(counterforEkleniFrekans + eklenicFrecansItems[i-1]);
        }

         classSinirs += "<tr><td>"+ (parseFloat(sinirAlt)+(h * i)) +"</td><td>"+ (parseFloat(sinirUst)+(h * i)) +"</td></tr>";
         sinifAltSinirlarValues.push((parseFloat(sinirAlt)+(h * i)));
         //  sinif frekans
         sinifFrekans += "<tr><td>" + counter + "</td></tr>";
         sinifFrekansValues.push(counter);
         //  oransal sinif frekans
         oransalFrekans += "<tr><td>" + counter + "/"+ n+"</td></tr>";
         // sinif ortalama noktasi
         sinifOrtalamaNoktasi += "<tr><td>"+((parseFloat(limitAlt)+(h * i)) + (parseFloat(limitUst)+(h * i)))/2 +"</td></tr>";
         //  eklenik frekanslar
         eklaneikFreakans += "<tr><td>" + eklenicFrecansItems[i] +"</td></tr>";
         //  oransal eklenik frekanslar
         oransalEklenikFrekanslar += "<tr><td>" + eklenicFrecansItems[i] +"/" + n+"</td></tr>";
   } 

    document.getElementById("classLimits").innerHTML = classLimits;
    document.getElementById("ClassSinirs").innerHTML = classSinirs;
    document.getElementById("classFrequencTable").innerHTML = sinifFrekans;
    document.getElementById("oransalFrekanslar").innerHTML = oransalFrekans;
    document.getElementById("sinifOrtallamaNoktasi").innerHTML = sinifOrtalamaNoktasi;
    document.getElementById("ClasseklenikFrekans").innerHTML = eklaneikFreakans;
    document.getElementById("oransalEklenikFrekanslar").innerHTML = oransalEklenikFrekanslar;
}

// calculate dispersion measure
function calculateDispersionMeasure(){

    if(sinifwidth == 0){
        return alert("Önce Frekans Tablosu Hesaplayı");
    }

    var n = arrangedItems.length;
    var ortalama = 0;
    arrangedItems.forEach(function myfunc(item){
        ortalama += parseFloat(item);
    });

    ortalama = ortalama/n;
    var varyans = 0;
    arrangedItems.forEach(function myfunc(item){
        varyans += Math.pow((item - ortalama),2);
    });

    var m3 = 0;
    arrangedItems.forEach(function myfunc(item){
       m3 += Math.pow((item - ortalama), 3);
    });
    m3 = m3/(n-1);

    var m4 = 0;
    arrangedItems.forEach(function myfunc(item){
       m4 += Math.pow((item - ortalama), 4);
    });
    m4 = m4/(n-1);

    varyans = varyans/(n-1);
    var standartSapma = Math.sqrt(varyans);
    var min = arrangedItems[0];
    var max =  arrangedItems[arrangedItems.length-1];

    document.getElementById("variance").innerHTML = varyans.toFixed(3);
    document.getElementById("standartSapma").innerHTML = standartSapma.toFixed(3);
    document.getElementById("m3").innerHTML = m3.toFixed(3);
    document.getElementById("m4").innerHTML = m4.toFixed(3);
    document.getElementById("min").innerHTML = min;
    document.getElementById("max").innerHTML = max;
    calculateMeanAbsoluteDeviation();
    calculateQ1();
    calculateQ3()
}



function calculateQ1(){
    // alt dortte birligin n/4 hesapla
    var altNboluDort = arrangedItems.length/4;
    var chekingValue = 0.0;
    var QBirSinifIndex = 0;
    while( chekingValue < altNboluDort){

        chekingValue += parseFloat(sinifFrekansValues[QBirSinifIndex]);
        QBirSinifIndex++;
    }

    var n1 = 0;
    for(var i = 0; i < (QBirSinifIndex-1) ; i++){
        n1 += sinifFrekansValues[i];
    }


    var FQ1 = sinifFrekansValues[QBirSinifIndex-1];
    var L1 = sinifAltSinirlarValues[QBirSinifIndex-1];
    var j1 = altNboluDort - n1;

    var Q1 = L1 + ((j1 * sinifwidth) / (FQ1));
    document.getElementById("Q1").innerHTML = Q1;
}


function calculateQ3(){
    // alt dortte birligin n/4 hesapla
    var ust3Nbolu4 = ( arrangedItems.length * 3 )/4;
    var chekingValue = 0.0;
    var Q3SinifIndex = 0;
    while( chekingValue < ust3Nbolu4){

        chekingValue += parseFloat(sinifFrekansValues[Q3SinifIndex]);
        Q3SinifIndex++;
    }

    debugger;
    var n3 = 0;
    for(var i = 0; i < (Q3SinifIndex-1) ; i++){
        n3 += sinifFrekansValues[i];
    }


    var FQ3 = sinifFrekansValues[Q3SinifIndex-1];
    var L3 = sinifAltSinirlarValues[Q3SinifIndex-1];
    var j3 = ust3Nbolu4 - n3;

    var Q3 = L3 + ((j3 * sinifwidth) / (FQ3));
    document.getElementById("Q3").innerHTML = Q3;
}

// calculate ortalama mutlak sapma
function calculateMeanAbsoluteDeviation(){
    var n = arrangedItems.length;
    var ortalama = 0;
    arrangedItems.forEach(function myfunc(item){
        ortalama += parseFloat(item);
    });
    ortalama = ortalama/n;
    var varyans = 0;
    arrangedItems.forEach(function myfunc(item){
        varyans += Math.abs(item - ortalama);
    });
    varyans = varyans/n;
    document.getElementById("ortalamaMutlakSapma").innerHTML = varyans.toFixed(3);
}


// calculate permutaion and combination
function calculatePermutationAndCombination(){

    var n = document.getElementById("n").value;
    var r = document.getElementById("r").value;

    var permutation = factorial(n)/factorial(n-r);
    var combination = factorial(n)/(factorial(r) * factorial(n-r));


    // alert(permutation);
    document.getElementById("Permutation").innerHTML = permutation;
    document.getElementById("Combination").innerHTML = combination;



}


// calculate the factorial
function factorial(n){
    //base case
    if(n == 0 || n == 1){
        return 1;
    //recursive case
    }else{
        return n * factorial(n-1);
    }
}






