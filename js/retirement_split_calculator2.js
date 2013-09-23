/* Retirement Split Calculator */

function ABC(field){
	var score = field.value;
   	if(score==0 || score < 40) {
	var MN = eval(document.SplitRetBenCalc.ServiceMN.value);
	var EF = eval(document.SplitRetBenCalc.ServiceEF.value);
	var Tcount = (MN + EF);	
	
	document.SplitRetBenCalc.Total.value = format(Tcount,0);
}
}
function format(num,decimal) {
var count = decimal;
var Total = "";
if(decimal) { Total = "."; }
while(count--) { num = num*10; }
num = Math.round(num) + "";
var len = num.length;
count = decimal;
while(count--) { Total = Total + num.charAt(len-count-1); }
for(var x=len-decimal-1,count=0;x>=0;x--) {
Total = num.charAt(x) + Total;
if(!(++count%3) && x > 0) { Total = "," + Total; } // add commas
}
return(Total);
}

function SplitCalculate() {

	// Initialize Variables	
	var boolErrorCheck = "TRUE";
	var tierTypeFound = 0;
	var tierType = gettierType();
	var ageFactor = 0.0;
	var formAge = document.SplitRetBenCalc.Age.value;
	var formServiceMN = document.SplitRetBenCalc.ServiceMN.value;
	var formServiceEF = document.SplitRetBenCalc.ServiceEF.value;
	var selectedtype = document.SplitRetBenCalc;
	var formFinAvgMoComp = document.SplitRetBenCalc.FinAvgMoComp.value;
	

	 {
		EstimatedBenefit = 0;
		tierTypeFound = 0;
	
		for (var i = 0; i < selectedtype.tiers.length; i++) {
			if (selectedtype.tiers[i].checked) {
				tierTypeFound = 1;
				// If no errors were found, process input data.
					// Determine which tier to calculate with.
					switch(selectedtype.tiers[i].value) {
						case "General tier 1": EstimatedBenefit = EstimatedBenefit + (formFinAvgMoComp* 0.02 * formServiceA * gettier1Factor());
							break;
						case "General tier 2":  EstimatedBenefit = EstimatedBenefit + (formFinAvgMoComp* 0.016667 * formServiceB * gettier2Factor());
							break;
						case "Safety":  EstimatedBenefit = EstimatedBenefit +  (formFinAvgMoComp* 0.02 * formServiceCD * getSafetyFactor());
							break;
						case "Safety3":  EstimatedBenefit = EstimatedBenefit + (formFinAvgMoComp* 0.03 * formServiceEF *  getSafety3Factor());
							break;
						case "tier2555":  EstimatedBenefit = EstimatedBenefit + (formFinAvgMoComp* 0.02 * formServiceGH *  gettier2555Factor());
							break;
						case "tier2755":  EstimatedBenefit = EstimatedBenefit + (formFinAvgMoComp* 0.02 * formServiceIJ * gettier2755Factor());
							break;
						case "tier360":  EstimatedBenefit = EstimatedBenefit + (formFinAvgMoComp* 0.02 * formServiceKL * gettier360Factor());
							break;
						case "tier2055":  EstimatedBenefit = EstimatedBenefit + (formFinAvgMoComp* 0.02 * formServiceMN * gettier2055Factor());
							break;
						case "tier1665":  EstimatedBenefit = EstimatedBenefit + (formFinAvgMoComp* 0.011111 * formServiceOP * gettier1665Factor());
							break;
						case "safety355":  EstimatedBenefit = EstimatedBenefit + (formFinAvgMoComp* 0.03 * formServiceQR *  getsafety355Factor());
							break;

					}			
	
				}
			}
	
		}
	
	if (tierTypeFound == 0) {
		alert("No tier Type Selected!");  // Added for security, but not required (using the CHECKED command in the check box to force an initial selection)
	}
	
		
		if (EstimatedBenefit > parseFloat(formFinAvgMoComp))
		{
			document.SplitRetBenCalc.SplitMoRetAllow.value = formFinAvgMoComp;
			alert (" Your monthly allowance would be " +  "$" + (document.SplitRetBenCalc.FinAvgMoComp.value) + 
			" because the maximum monthly allowance you can receive is 100% of your Average Monthly Compensation." ) 
		}
		else
		{
			document.SplitRetBenCalc.SplitMoRetAllow.value = format(EstimatedBenefit,2);
	
	
}
function format(num,decimal) {
var count = decimal;
var SplitMoRetAllow = "";
if(decimal) { SplitMoRetAllow = "."; }
while(count--) { num = num*10; }
num = Math.round(num) + "";
var len = num.length;
count = decimal;
while(count--) { SplitMoRetAllow = SplitMoRetAllow + num.charAt(len-count-1); }
for(var x=len-decimal-1,count=0;x>=0;x--) {
SplitMoRetAllow = num.charAt(x) + SplitMoRetAllow;
if(!(++count%3) && x > 0) { SplitMoRetAllow = "," + SplitMoRetAllow; } // add commas
}
return(SplitMoRetAllow);
}


// Determines and returns a tier1 Age Factor to the calling function.
function gettier1Factor() {

	var tier1age = new Array (262);


	var tier1factor = new Array(262);

	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < tier1age.length; i++) {
		if (tier1age[i] == selectedAge) {
			break;
		}
	}
  return tier1factor[i];
}

// Determines and returns a tier2 Age Factor to the calling function.
function gettier2Factor() {
	var tier2age = new Array (332);

	var tier2factor = new Array(332);
   	         	        	           	    
	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < tier2age.length; i++) {
		if (tier2age[i] == selectedAge) {
			break;
		}
	}

   return tier2factor[i];
}

// Determines and returns a Safety Age Factor to the calling function.
function getSafetyFactor() {
	var safetyage = new Array (332);


	var safetyfactor = new Array(332);
        
	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < safetyage.length; i++) {
		if (safetyage[i] == selectedAge) {
			break;
		}
	}

   return safetyfactor[i];
}
// Determines and returns a Safety3 Age Factor to the calling function.
function getSafety3Factor() {

	var safety3age = new Array (332);
			safety3age[0]="38";
	        safety3age[1]="38.00";
	        safety3age[2]="38.0";
	        safety3age[3]="38.25";
	        safety3age[4]="38.50";
	        safety3age[5]="38.5";
	        safety3age[6]="38.75";
	        safety3age[7]="39";
	        safety3age[8]="39.00";
	        safety3age[9]="39.0";
	        safety3age[10]="39.25";
	        safety3age[11]="39.50";
	        safety3age[12]="39.5";
	        safety3age[13]="39.75";
	        safety3age[14]="40";
	        safety3age[15]="40.00";
	        safety3age[16]="40.0";
	        safety3age[17]="40.25";
	        safety3age[18]="40.50";
	        safety3age[19]="40.5";
	        safety3age[20]="40.75";
	        safety3age[21]="41";
	        safety3age[22]="41.00";
	        safety3age[23]="41.0";
	        safety3age[24]="41.25";
	        safety3age[25]="41.50";
	        safety3age[26]="41.5";
	        safety3age[27]="41.75";
	        safety3age[28]="42";
	        safety3age[29]="42.00";
	        safety3age[30]="42.0";
	        safety3age[31]="42.25";
	        safety3age[32]="42.50";
	        safety3age[33]="42.5";
	        safety3age[34]="42.75";
	        safety3age[35]="43";
	        safety3age[36]="43.00";
	        safety3age[37]="43.0";
	        safety3age[38]="43.25";
	        safety3age[39]="43.50";
	        safety3age[40]="43.5";
	        safety3age[41]="43.75";
	        safety3age[42]="44";
	        safety3age[43]="44.00";
	        safety3age[44]="44.0";
	        safety3age[45]="44.25";
	        safety3age[46]="44.50";
	        safety3age[47]="44.5";
	        safety3age[48]="44.75";
	        safety3age[49]="45";
	        safety3age[50]="45.00";
	        safety3age[51]="45.0";
	        safety3age[52]="45.25";
	        safety3age[53]="45.50";
	        safety3age[54]="45.5";
	        safety3age[55]="45.75";
	        safety3age[56]="46";
	        safety3age[57]="46.00";
	        safety3age[58]="46.0";
	        safety3age[59]="46.25";
	  	     safety3age[60]="46.50";
		     safety3age[61]="46.5";
		     safety3age[62]="46.75";
		     safety3age[63]="47";
		     safety3age[64]="47.00";
		     safety3age[65]="47.0";
		     safety3age[66]="47.25";
		     safety3age[67]="47.50";
		     safety3age[68]="47.5";
		     safety3age[69]="47.75";
		     safety3age[70]="48";
		     safety3age[71]="48.00";
		     safety3age[72]="48.0";
		     safety3age[73]="48.25";
		     safety3age[74]="48.50";
		     safety3age[75]="48.5";
		     safety3age[76]="48.75";
            safety3age[77]="49";
	        safety3age[78]="49.00";
	        safety3age[79]="49.0";
	        safety3age[80]="49.25";
	        safety3age[81]="49.50";
	        safety3age[82]="49.5";
	        safety3age[83]="49.75";
	        safety3age[84]="50";
	        safety3age[85]="50.00";
	        safety3age[86]="50.0";
	        safety3age[87]="50.25";
	        safety3age[88]="50.50";
	        safety3age[89]="50.5";
	        safety3age[90]="50.75";
	        safety3age[91]="51";
	        safety3age[92]="51.00";
	        safety3age[93]="51.0";
	        safety3age[94]="51.25";
	        safety3age[95]="51.50";
	        safety3age[96]="51.5";
	        safety3age[97]="51.75";
	        safety3age[98]="52";
	        safety3age[99]="52.00";
	        safety3age[100]="52.0";
	        safety3age[101]="52.25";
	        safety3age[102]="52.50";
	        safety3age[103]="52.5";
	        safety3age[104]="52.75";
	        safety3age[105]="53";
	        safety3age[106]="53.00";
	        safety3age[107]="53.0";
	        safety3age[108]="53.25";
	        safety3age[109]="53.50";
	        safety3age[110]="53.5";
	        safety3age[111]="53.75";
	        safety3age[112]="54";
	        safety3age[113]="54.00";
	        safety3age[114]="54.0";
	        safety3age[115]="54.25";
	        safety3age[116]="54.50";
	        safety3age[117]="54.5";
	        safety3age[118]="54.75";
	        safety3age[119]="55";
	        safety3age[120]="55.00";
	        safety3age[121]="55.0";
	        safety3age[122]="55.25";
	  	     safety3age[123]="55.50";
		     safety3age[124]="55.5";
		     safety3age[125]="55.75";
		     safety3age[126]="56";
		     safety3age[127]="56.00";
		     safety3age[128]="56.0";
		     safety3age[129]="56.25";
		     safety3age[130]="56.50";
		     safety3age[131]="56.5";
		     safety3age[132]="56.75";
		     safety3age[133]="57";
		     safety3age[134]="57.00";
		     safety3age[135]="57.0";
		     safety3age[136]="57.25";
		     safety3age[137]="57.50";
		     safety3age[138]="57.5";
		     safety3age[139]="57.75";
            safety3age[140]="58";
	        safety3age[141]="58.00";
	        safety3age[142]="58.0";
	        safety3age[143]="58.25";
	        safety3age[144]="58.50";
	        safety3age[145]="58.5";
	        safety3age[146]="58.75";
	        safety3age[147]="59";
	        safety3age[148]="59.00";
	        safety3age[149]="59.0";
	        safety3age[150]="59.25";
	        safety3age[151]="59.50";
	        safety3age[152]="59.5";
	        safety3age[153]="59.75";
	        safety3age[154]="60";
	        safety3age[155]="60.00";
	        safety3age[156]="60.0";
	        safety3age[157]="60.25";
	        safety3age[158]="60.50";
	        safety3age[159]="60.5";
	        safety3age[160]="60.75";
	        safety3age[161]="61";
	        safety3age[162]="61.00";
	        safety3age[163]="61.0";
	        safety3age[164]="61.25";
	        safety3age[165]="61.50";
	        safety3age[166]="61.5";
	        safety3age[167]="61.75";
	        safety3age[168]="62";
			 safety3age[169]="62.00";
	        safety3age[170]="62.0";
	        safety3age[171]="62.25";
	        safety3age[172]="62.50";
	        safety3age[173]="62.5";
	        safety3age[174]="62.75";
	        safety3age[175]="63";
	        safety3age[176]="63.00";
	        safety3age[177]="63.0";
	        safety3age[178]="63.25";
		     safety3age[179]="63.50";
		     safety3age[180]="63.5";
		     safety3age[181]="63.75";
		     safety3age[182]="64";
		     safety3age[183]="64.00";
		     safety3age[184]="64.0";
		     safety3age[185]="64.25";
		     safety3age[186]="64.50";
		     safety3age[187]="64.5";
		     safety3age[188]="64.75";
		     safety3age[189]="65";
		     safety3age[190]="65.00";
		     safety3age[191]="65.0";
		     safety3age[192]="65.25";
		     safety3age[193]="65.50";
            safety3age[194]="65.5";
            safety3age[195]="65.75";
		     safety3age[196]="66";
	        safety3age[197]="66.00";
	        safety3age[198]="66.0";
	        safety3age[199]="66.25";
	        safety3age[200]="66.50";
	        safety3age[201]="66.5";
	        safety3age[202]="66.75";
	        safety3age[203]="67";
	        safety3age[204]="67.00";
	        safety3age[205]="67.0";
	        safety3age[206]="67.25";
	        safety3age[207]="67.50";
	        safety3age[208]="67.5";
	        safety3age[209]="67.75";
	        safety3age[210]="68";
	        safety3age[211]="68.00";
	        safety3age[212]="68.0";
	        safety3age[213]="68.25";
	        safety3age[214]="68.50";
	        safety3age[215]="68.5";
	        safety3age[216]="68.75";
	        safety3age[217]="69";
	        safety3age[218]="69.00";
	        safety3age[219]="69.0";
	        safety3age[220]="69.25";
	        safety3age[221]="69.50";
	        safety3age[222]="69.5";
	        safety3age[223]="69.75";
	        safety3age[224]="70";
	        safety3age[225]="70.00";
	        safety3age[226]="70.0";
	        safety3age[227]="70.25";
	        safety3age[228]="70.50";
	        safety3age[229]="70.5";
	        safety3age[230]="70.75";
	        safety3age[231]="71";
	        safety3age[232]="71.00";
	        safety3age[233]="71.0";
	        safety3age[234]="71.25";
	        safety3age[235]="71.50";
	        safety3age[236]="71.5";
	        safety3age[237]="71.75";
	        safety3age[238]="72";
			 safety3age[239]="72.00";
	        safety3age[240]="72.0";
	        safety3age[241]="72.25";
	        safety3age[242]="72.50";
	        safety3age[243]="72.5";
	        safety3age[244]="72.75";
	        safety3age[245]="73";
	        safety3age[246]="73.00";
	        safety3age[247]="73.0";
	        safety3age[248]="73.25";
		     safety3age[249]="73.50";
		     safety3age[250]="73.5";
		     safety3age[251]="73.75";
		     safety3age[252]="74";
		     safety3age[253]="74.00";
		     safety3age[254]="74.0";
		     safety3age[255]="74.25";
		     safety3age[256]="74.50";
		     safety3age[257]="74.5";
		     safety3age[258]="74.75";
		     safety3age[259]="75";
		     safety3age[260]="75.00";
		     safety3age[261]="75.0";
		     safety3age[262]="75.25";
		     safety3age[263]="75.50";
            safety3age[264]="75.5";
            safety3age[265]="75.75";
		     safety3age[266]="76";
	        safety3age[267]="76.00";
	        safety3age[268]="76.0";
	        safety3age[269]="76.25";
	        safety3age[270]="76.50";
	        safety3age[271]="76.5";
	        safety3age[272]="76.75";
	        safety3age[273]="77";
	        safety3age[274]="77.00";
	        safety3age[275]="77.0";
	        safety3age[276]="77.25";
	        safety3age[277]="77.50";
	        safety3age[278]="77.5";
	        safety3age[279]="77.75";
	        safety3age[280]="78";
	        safety3age[281]="78.00";
	        safety3age[282]="78.0";
	        safety3age[283]="78.25";
	        safety3age[284]="78.50";
	        safety3age[285]="78.5";
	        safety3age[286]="78.75";
	        safety3age[287]="79";
	        safety3age[288]="79.00";
	        safety3age[289]="79.0";
	        safety3age[290]="79.25";
	        safety3age[291]="79.50";
	        safety3age[292]="79.5";
	        safety3age[293]="79.75";
	        safety3age[294]="80";
	        safety3age[295]="80.00";
	        safety3age[296]="80.0";
	        safety3age[297]="80.25";
	        safety3age[298]="80.50";
	        safety3age[299]="80.5";
	        safety3age[300]="80.75";
	        safety3age[301]="81";
	        safety3age[302]="81.00";
	        safety3age[303]="81.0";
	        safety3age[304]="81.25";
	        safety3age[305]="81.50";
	        safety3age[306]="81.5";
	        safety3age[307]="81.75";
	        safety3age[308]="82";
			 safety3age[309]="82.00";
	        safety3age[310]="82.0";
	        safety3age[311]="82.25";
	        safety3age[312]="82.50";
	        safety3age[313]="82.5";
	        safety3age[314]="82.75";
	        safety3age[315]="83";
	        safety3age[316]="83.00";
	        safety3age[317]="83.0";
	        safety3age[318]="83.25";
		     safety3age[319]="83.50";
		     safety3age[320]="83.5";
		     safety3age[321]="83.75";
		     safety3age[322]="84";
		     safety3age[323]="84.00";
		     safety3age[324]="84.0";
		     safety3age[325]="84.25";
		     safety3age[326]="84.50";
		     safety3age[327]="84.5";
		     safety3age[328]="84.75";
		     safety3age[329]="85";
		     safety3age[330]="85.00";
		     safety3age[331]="85.0";
	        


	var safety3factor = new Array(332);
	        safety3factor[0]=0.6258000001;
	        safety3factor[1]=0.6258000001;	        	        	        
	        safety3factor[2]=0.6258000001;	        
	        safety3factor[3]=0.6258000001;
	        safety3factor[4]=0.6258000001;
	        safety3factor[5]=0.6258000001;
	        safety3factor[6]=0.6258000001;
	        safety3factor[7]=0.6258000001;
	        safety3factor[8]=0.6258000001;
	        safety3factor[9]=0.6258000001;
	        safety3factor[10]=0.6258000001;
	        safety3factor[11]=0.6258000001;
	        safety3factor[12]=0.6258000001;
	        safety3factor[13]=0.6258000001;
	        safety3factor[14]=0.6258000001;
	        safety3factor[15]=0.6258000001;
	        safety3factor[16]=0.6258000001;
	        safety3factor[17]=0.6258000001;
	        safety3factor[18]=0.6258000001;
	        safety3factor[19]=0.6258000001;
	        safety3factor[20]=0.6258000001;
	        safety3factor[21]=0.6258000001;
	        safety3factor[22]=0.6258000001;
	        safety3factor[23]=0.6258000001;
	        safety3factor[24]=0.6350000001;
	        safety3factor[25]=0.6442000001;
	        safety3factor[26]=0.6442000001;
	        safety3factor[27]=0.6533000001;
   	        safety3factor[28]=0.6625000001;
	        safety3factor[29]=0.6625000001;
	        safety3factor[30]=0.6625000001;
	        safety3factor[31]=0.6720000001;
	        safety3factor[32]=0.6814000001;
	        safety3factor[33]=0.6814000001;
	        safety3factor[34]=0.6909000001;
	        safety3factor[35]=0.7004000001;
	        safety3factor[36]=0.7004000001;
	        safety3factor[37]=0.7004000001;
	        safety3factor[38]=0.7102000001;
	        safety3factor[39]=0.7200000001;
	        safety3factor[40]=0.7200000001;
	        safety3factor[41]=0.7299000001;
	        safety3factor[42]=0.7397000001;
	        safety3factor[43]=0.7397000001;
	        safety3factor[44]=0.7397000001;
	        safety3factor[45]=0.7499000001;
	        safety3factor[46]=0.7601000001;
	        safety3factor[47]=0.7601000001;
	        safety3factor[48]=0.7703000001;
	        safety3factor[49]=0.7805000001;
	        safety3factor[50]=0.7805000001;
	        safety3factor[51]=0.7805000001;
	        safety3factor[52]=0.7910000001;
	        safety3factor[53]=0.8016000001;
	        safety3factor[54]=0.8016000001;
	        safety3factor[55]=0.8021000001;
	        safety3factor[56]=0.8226000001;
	        safety3factor[57]=0.8226000001;
	        safety3factor[58]=0.8226000001;
	        safety3factor[59]=0.8339000001;
	  	     safety3factor[60]=0.8452000001;
		     safety3factor[61]=0.8452000001;
		     safety3factor[62]=0.8565000001;
		     safety3factor[63]=0.8678000001;
		     safety3factor[64]=0.8678000001;
		     safety3factor[65]=0.8678000001;
		     safety3factor[66]=0.8780000001;
		     safety3factor[67]=0.8882000001;
		     safety3factor[68]=0.8882000001;
		     safety3factor[69]=0.8983000001;
		     safety3factor[70]=0.9085000001;
		     safety3factor[71]=0.9085000001;
		     safety3factor[72]=0.9085000001;
		     safety3factor[73]=0.9194000001;
		     safety3factor[74]=0.9304000001;
		     safety3factor[75]=0.9304000001;
		     safety3factor[76]=0.94130000001;
            safety3factor[77]=0.9522000001;
	        safety3factor[78]=0.9522000001;
	        safety3factor[79]=0.9522000001;
	        safety3factor[80]=0.9641000001;
	        safety3factor[81]=0.9761000001;
	        safety3factor[82]=0.9761000001;
	        safety3factor[83]=0.9880000001;
	        safety3factor[84]=1.0000000001;
	        safety3factor[85]=1.0000000001;
	        safety3factor[86]=1.0000000001;
	        safety3factor[87]=1.0000000001;
	        safety3factor[88]=1.0000000001;
	        safety3factor[89]=1.0000000001;
	        safety3factor[90]=1.0000000001;
	        safety3factor[91]=1.0000000001;
	        safety3factor[92]=1.0000000001;
	        safety3factor[93]=1.0000000001;

	        safety3factor[94]=1.0000000001;
	        safety3factor[95]=1.0000000001;
	        safety3factor[96]=1.0000000001;
	        safety3factor[97]=1.0000000001;
	        safety3factor[98]=1.0000000001;
	        safety3factor[99]=1.0000000001;
	        safety3factor[100]=1.0000000001;
	        safety3factor[101]=1.0000000001;
	        safety3factor[102]=1.0000000001;
	        safety3factor[103]=1.0000000001;
	        safety3factor[104]=1.0000000001;
	        safety3factor[105]=1.0000000001;
	        safety3factor[106]=1.0000000001;
	        safety3factor[107]=1.0000000001;
	        safety3factor[108]=1.0000000001;
	        safety3factor[109]=1.0000000001;
	        safety3factor[110]=1.0000000001;
	        safety3factor[111]=1.0000000001;
	        safety3factor[112]=1.0000000001;
	        safety3factor[113]=1.0000000001;
	        safety3factor[114]=1.0000000001;
	        safety3factor[115]=1.0000000001;
	        safety3factor[116]=1.0000000001;
	        safety3factor[117]=1.0000000001;
	        safety3factor[118]=1.0000000001;
	        safety3factor[119]=1.0000000001;
	        safety3factor[120]=1.0000000001;
	        safety3factor[121]=1.0000000001;
	        safety3factor[122]=1.0000000001;
	  	     safety3factor[123]=1.0000000001;
		     safety3factor[124]=1.0000000001;
		     safety3factor[125]=1.0000000001;
		     safety3factor[126]=1.0000000001;
		     safety3factor[127]=1.0000000001;
		     safety3factor[128]=1.0000000001;
		     safety3factor[129]=1.0000000001;
		     safety3factor[130]=1.0000000001;
		     safety3factor[131]=1.0000000001;
		     safety3factor[132]=1.0000000001;		     
		     safety3factor[133]=1.0000000001;
	        safety3factor[134]=1.0000000001;
	        safety3factor[135]=1.0000000001;
		     safety3factor[136]=1.0000000001;
		     safety3factor[137]=1.0000000001;
		     safety3factor[138]=1.0000000001;
		     safety3factor[139]=1.0000000001;
            safety3factor[140]=1.0000000001;
	        safety3factor[141]=1.0000000001;
	        safety3factor[142]=1.0000000001;
	        safety3factor[143]=1.0000000001;
	        safety3factor[144]=1.0000000001;
	        safety3factor[145]=1.0000000001;
	        safety3factor[146]=1.0000000001;
	        safety3factor[147]=1.0000000001;
	        safety3factor[148]=1.0000000001;
	        safety3factor[149]=1.0000000001;
	        safety3factor[150]=1.0000000001;
	        safety3factor[151]=1.0000000001;
	        safety3factor[152]=1.0000000001;
	        safety3factor[153]=1.0000000001;
	        safety3factor[154]=1.0000000001;
	        safety3factor[155]=1.0000000001;
	        safety3factor[156]=1.0000000001;
	        safety3factor[157]=1.0000000001;
	        safety3factor[158]=1.0000000001;
	        safety3factor[159]=1.0000000001;
	        safety3factor[160]=1.0000000001;
	        safety3factor[161]=1.0000000001;
	        safety3factor[162]=1.0000000001;
	        safety3factor[163]=1.0000000001;
	        safety3factor[164]=1.0000000010;
	        safety3factor[165]=1.0000000001;
	        safety3factor[166]=1.0000000001;
	        safety3factor[167]=1.0000000001;
	        safety3factor[168]=1.0000000001;
			 safety3factor[169]=1.0000000001;
	        safety3factor[170]=1.0000000001;
	        safety3factor[171]=1.0000000001;
	        safety3factor[172]=1.0000000001;
	        safety3factor[173]=1.0000000001;
	        safety3factor[174]=1.0000000001;
	        safety3factor[175]=1.0000000001;
	        safety3factor[176]=1.0000000001;
	        safety3factor[177]=1.0000000001;
	        safety3factor[178]=1.0000000001;
		     safety3factor[179]=1.0000000001;
		     safety3factor[180]=1.0000000001;
		     safety3factor[181]=1.0000000001;
		     safety3factor[182]=1.0000000001;
		     safety3factor[183]=1.0000000001;
		     safety3factor[184]=1.0000000001;
		     safety3factor[185]=1.0000000001;
		     safety3factor[186]=1.0000000001;
		     safety3factor[187]=1.0000000001;
		     safety3factor[188]=1.0000000001;
		     safety3factor[189]=1.0000000001;
		     safety3factor[190]=1.0000000001;
		     safety3factor[191]=1.0000000001;
		     safety3factor[192]=1.0000000001;
		     safety3factor[193]=1.0000000001;
            safety3factor[194]=1.0000000001;
            safety3factor[195]=1.0000000001;
		     safety3factor[196]=1.0000000001;
	        safety3factor[197]=1.0000000001;
	        safety3factor[198]=1.0000000001;
	        safety3factor[199]=1.0000000001;
	        safety3factor[200]=1.0000000001;
	        safety3factor[201]=1.0000000001;
	        safety3factor[202]=1.0000000001;
	        safety3factor[203]=1.0000000001;
	        safety3factor[204]=1.0000000001;
	        safety3factor[205]=1.0000000001;
	        safety3factor[206]=1.0000000001;
	        safety3factor[207]=1.0000000001;
	        safety3factor[208]=1.0000000001;
	        safety3factor[209]=1.0000000001;
	        safety3factor[210]=1.0000000001;
	        safety3factor[211]=1.0000000001;
	        safety3factor[212]=1.0000000001;
	        safety3factor[213]=1.0000000001;
	        safety3factor[214]=1.0000000001;
	        safety3factor[215]=1.0000000001;
	        safety3factor[216]=1.0000000001;
	        safety3factor[217]=1.0000000001;
	        safety3factor[218]=1.0000000001;
	        safety3factor[219]=1.0000000001;
	        safety3factor[220]=1.0000000001;
	        safety3factor[221]=1.0000000001;
	        safety3factor[222]=1.0000000001;
	        safety3factor[223]=1.0000000001;
	        safety3factor[224]=1.0000000001;
	        safety3factor[225]=1.0000000001;
	        safety3factor[226]=1.0000000001;
	        safety3factor[227]=1.0000000001;
		     safety3factor[228]=1.0000000001;
		     safety3factor[229]=1.0000000001;
		     safety3factor[230]=1.0000000001;
		     safety3factor[231]=1.0000000001;
		     safety3factor[232]=1.0000000001;		     
		     safety3factor[233]=1.0000000001;
	        safety3factor[234]=1.0000000001;
	        safety3factor[235]=1.0000000001;
		     safety3factor[236]=1.0000000001;
		     safety3factor[237]=1.0000000001;
		     safety3factor[238]=1.0000000001;
		     safety3factor[239]=1.0000000001;
            safety3factor[240]=1.0000000001;
	        safety3factor[241]=1.0000000001;
	        safety3factor[242]=1.0000000001;
	        safety3factor[243]=1.0000000001;
	        safety3factor[244]=1.0000000001;
	        safety3factor[245]=1.0000000001;
	        safety3factor[246]=1.0000000001;
	        safety3factor[247]=1.0000000001;
	        safety3factor[248]=1.0000000001;
	        safety3factor[249]=1.0000000001;
	        safety3factor[250]=1.0000000001;
	        safety3factor[251]=1.0000000001;
	        safety3factor[252]=1.0000000001;
	        safety3factor[253]=1.0000000001;
	        safety3factor[254]=1.0000000001;
	        safety3factor[255]=1.0000000001;
	        safety3factor[256]=1.0000000001;
	        safety3factor[257]=1.0000000001;
	        safety3factor[258]=1.0000000001;

	        safety3factor[259]=1.0000000001;
	        safety3factor[260]=1.0000000001;
	        safety3factor[261]=1.0000000001;
	        safety3factor[262]=1.0000000001;
	        safety3factor[263]=1.0000000001;
	        safety3factor[264]=1.0000000010;
	        safety3factor[265]=1.0000000001;
	        safety3factor[266]=1.0000000001;
	        safety3factor[267]=1.0000000001;
	        safety3factor[268]=1.0000000001;
			 safety3factor[269]=1.0000000001;
	        safety3factor[270]=1.0000000001;
	        safety3factor[271]=1.0000000001;
	        safety3factor[272]=1.0000000001;
	        safety3factor[273]=1.0000000001;
	        safety3factor[274]=1.0000000001;
	        safety3factor[275]=1.0000000001;
	        safety3factor[276]=1.0000000001;
	        safety3factor[277]=1.0000000001;
	        safety3factor[278]=1.0000000001;
		     safety3factor[279]=1.0000000001;
		     safety3factor[280]=1.0000000001;
		     safety3factor[281]=1.0000000001;
		     safety3factor[282]=1.0000000001;
		     safety3factor[283]=1.0000000001;
		     safety3factor[284]=1.0000000001;
		     safety3factor[285]=1.0000000001;
		     safety3factor[286]=1.0000000001;
		     safety3factor[287]=1.0000000001;
		     safety3factor[288]=1.0000000001;
		     safety3factor[289]=1.0000000001;
		     safety3factor[290]=1.0000000001;
		     safety3factor[291]=1.0000000001;
		     safety3factor[292]=1.0000000001;
		     safety3factor[293]=1.0000000001;
            safety3factor[294]=1.0000000001;
            safety3factor[295]=1.0000000001;
		     safety3factor[296]=1.0000000001;
	        safety3factor[297]=1.0000000001;
	        safety3factor[298]=1.0000000001;
	        safety3factor[299]=1.0000000001;
	        safety3factor[300]=1.0000000001;
	        safety3factor[301]=1.0000000001;
	        safety3factor[302]=1.0000000001;
	        safety3factor[303]=1.0000000001;
	        safety3factor[304]=1.0000000001;
	        safety3factor[305]=1.0000000001;
	        safety3factor[306]=1.0000000001;
	        safety3factor[307]=1.0000000001;
	        safety3factor[308]=1.0000000001;
	        safety3factor[309]=1.0000000001;
	        safety3factor[310]=1.0000000001;
	        safety3factor[311]=1.0000000001;
	        safety3factor[312]=1.0000000001;
	        safety3factor[313]=1.0000000001;
	        safety3factor[314]=1.0000000001;
	        safety3factor[315]=1.0000000001;
	        safety3factor[316]=1.0000000001;
	        safety3factor[317]=1.0000000001;
	        safety3factor[318]=1.0000000001;
	        safety3factor[319]=1.0000000001;
	        safety3factor[320]=1.0000000001;
	        safety3factor[321]=1.0000000001;
	        safety3factor[322]=1.0000000001;
	        safety3factor[323]=1.0000000001;
	        safety3factor[324]=1.0000000001;
	        safety3factor[325]=1.0000000001;
	        safety3factor[326]=1.0000000001;
	        safety3factor[327]=1.0000000001;
	        safety3factor[328]=1.0000000001;
	        safety3factor[329]=1.0000000001;
	        safety3factor[330]=1.0000000001;
	        safety3factor[331]=1.0000000001;


	        
	        
	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < safety3age.length; i++) {
		if (safety3age[i] == selectedAge) {
			break;
		}
	}

   return safety3factor[i];
}

// Determines and returns a tier360 Age Factor to the calling function.
function gettier360Factor() {

	var tier360age = new Array (261);


	var tier360factor = new Array(261);

	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < tier360age.length; i++) {
		if (tier360age[i] == selectedAge) {
			break;
		}
	}
  return tier360factor[i];
}

// Determines and returns a tier2755 Age Factor to the calling function.
function gettier2755Factor() {

	var tier2755age = new Array (261);


	var tier2755factor = new Array(261);

	   	         	        	           	    
	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < tier2755age.length; i++) {
		if (tier2755age[i] == selectedAge) {
			break;
		}
	}

   return tier2755factor[i];
}

// Determines and returns a tier2555 Age Factor to the calling function.
function gettier2555Factor() {

	var tier2555age = new Array (261);


	var tier2555factor = new Array(261);


	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < tier2555age.length; i++) {
		if (tier2555age[i] == selectedAge) {
			break;
		}
	}
  return tier2555factor[i];
}

// Determines and returns a tier2055 Age Factor to the calling function.
function gettier2055Factor() {

	var tier2055age = new Array (231);
	        tier2055age[0]="48";
           	tier2055age[1]="48.00";
           	tier2055age[2]="48.0";
           	tier2055age[3]="48.25";
        	tier2055age[4]="48.50";
        	tier2055age[5]="48.5";
        	tier2055age[6]="48.75";
        	tier2055age[7]="49";
        	tier2055age[8]="49.00";
        	tier2055age[9]="49.0";
        	tier2055age[10]="49.25";
        	tier2055age[11]="49.50";
        	tier2055age[12]="49.5";
        	tier2055age[13]="49.75";
			tier2055age[14]="50";
            tier2055age[15]="50.00";
            tier2055age[16]="50.0";
            tier2055age[17]="50.25";
        	tier2055age[18]="50.50";
        	tier2055age[19]="50.5";
        	tier2055age[20]="50.75";
        	tier2055age[21]="51";
        	tier2055age[22]="51.00";
        	tier2055age[23]="51.0";
        	tier2055age[24]="51.25";
        	tier2055age[25]="51.50";
        	tier2055age[26]="51.5";
        	tier2055age[27]="51.75";         
           	tier2055age[28]="52";
           	tier2055age[29]="52.00";
           	tier2055age[30]="52.0";
           	tier2055age[31]="52.25";
        	tier2055age[32]="52.50";
        	tier2055age[33]="52.5";
        	tier2055age[34]="52.75";
        	tier2055age[35]="53";
        	tier2055age[36]="53.00";
        	tier2055age[37]="53.0";
        	tier2055age[38]="53.25";
        	tier2055age[39]="53.50";
        	tier2055age[40]="53.5";
        	tier2055age[41]="53.75";
        	tier2055age[42]="54";
        	tier2055age[43]="54.00";
        	tier2055age[44]="54.0";
        	tier2055age[45]="54.25";
        	tier2055age[46]="54.50";
        	tier2055age[47]="54.5";
        	tier2055age[48]="54.75";
        	tier2055age[49]="55";
        	tier2055age[50]="55.00";
        	tier2055age[51]="55.0";
        	tier2055age[52]="55.25";
        	tier2055age[53]="55.50";
        	tier2055age[54]="55.5";
        	tier2055age[55]="55.75";
        	tier2055age[56]="56";
        	tier2055age[57]="56.00";
        	tier2055age[58]="56.0";
        	tier2055age[59]="56.25";
        	tier2055age[60]="56.50";
        	tier2055age[61]="56.5";
        	tier2055age[62]="56.75";
        	tier2055age[63]="57";
        	tier2055age[64]="57.00";
        	tier2055age[65]="57.0";
        	tier2055age[66]="57.25";
      		tier2055age[67]="57.50";
    		tier2055age[68]="57.5";
    		tier2055age[69]="57.75";
    		tier2055age[70]="58";
    		tier2055age[71]="58.00";
    		tier2055age[72]="58.0";
    		tier2055age[73]="58.25";
    		tier2055age[74]="58.50";
    		tier2055age[75]="58.5";
    		tier2055age[76]="58.75";
    		tier2055age[77]="59";
    		tier2055age[78]="59.00";
    		tier2055age[79]="59.0";
    		tier2055age[80]="59.25";
    		tier2055age[81]="59.50";
    		tier2055age[82]="59.5";
    		tier2055age[83]="59.75";
            tier2055age[84]="60";
            tier2055age[85]="60.00";
        	tier2055age[86]="60.0";
        	tier2055age[87]="60.25";
        	tier2055age[88]="60.50";
        	tier2055age[89]="60.5";
        	tier2055age[90]="60.75";
        	tier2055age[91]="61";
        	tier2055age[92]="61.00";
        	tier2055age[93]="61.0";
        	tier2055age[94]="61.25";
        	tier2055age[95]="61.50";
        	tier2055age[96]="61.5";
        	tier2055age[97]="61.75";
        	tier2055age[98]="62";
        	tier2055age[99]="62.00";
        	tier2055age[100]="62.0";
        	tier2055age[101]="62.25";
        	tier2055age[102]="62.50";
        	tier2055age[103]="62.5";
        	tier2055age[104]="62.75";
        	tier2055age[105]="63";
        	tier2055age[106]="63.00";
        	tier2055age[107]="63.0";
        	tier2055age[108]="63.25";
        	tier2055age[109]="63.50";
        	tier2055age[110]="63.5";
        	tier2055age[111]="63.75";
        	tier2055age[112]="64";
        	tier2055age[113]="64.00";
        	tier2055age[114]="64.0";
        	tier2055age[115]="64.25";
        	tier2055age[116]="64.50";
        	tier2055age[117]="64.5";
        	tier2055age[118]="64.75";
        	tier2055age[119]="65";
        	tier2055age[120]="65.00";
        	tier2055age[121]="65.0";
        	tier2055age[122]="65.25";
     		tier2055age[123]="65.50";
     		tier2055age[124]="65.5";
     		tier2055age[125]="65.75";
     		tier2055age[126]="66";
     		tier2055age[127]="66.00";
     		tier2055age[128]="66.0";
     		tier2055age[129]="66.25";
     		tier2055age[130]="66.50";
     		tier2055age[131]="66.5";
     		tier2055age[132]="66.75";
     		tier2055age[133]="67";
     		tier2055age[134]="67.00";
     		tier2055age[135]="67.0";
     		tier2055age[136]="67.25";
     		tier2055age[137]="67.50";
            tier2055age[138]="67.5";
            tier2055age[139]="67.75";
     		tier2055age[140]="68";
     		tier2055age[141]="68.00";
        	tier2055age[142]="68.0";
        	tier2055age[143]="68.25";
        	tier2055age[144]="68.50";
        	tier2055age[145]="68.5";
        	tier2055age[146]="68.75";
        	tier2055age[147]="69";
        	tier2055age[148]="69.00";
        	tier2055age[149]="69.0";
        	tier2055age[150]="69.25";
        	tier2055age[151]="69.50";
        	tier2055age[152]="69.5";
        	tier2055age[153]="69.75";
        	tier2055age[154]="70";
        	tier2055age[155]="70.00";
        	tier2055age[156]="70.0";
        	tier2055age[157]="70.25";
        	tier2055age[158]="70.50";
        	tier2055age[159]="70.5";
        	tier2055age[160]="70.75";
        	tier2055age[161]="71";
        	tier2055age[162]="71.00";
        	tier2055age[163]="71.0";
        	tier2055age[164]="71.25";
        	tier2055age[165]="71.50";
        	tier2055age[166]="71.5";
        	tier2055age[167]="71.75";
        	tier2055age[168]="72";
        	tier2055age[169]="72.00";
            tier2055age[170]="72.0";
            tier2055age[171]="72.25";
            tier2055age[172]="72.50";
            tier2055age[173]="72.5";
            tier2055age[174]="72.75";
            tier2055age[175]="73";
        	tier2055age[176]="73.00";
            tier2055age[177]="73.0";
            tier2055age[178]="73.25";
            tier2055age[179]="73.50";
            tier2055age[180]="73.5";
            tier2055age[181]="73.75";
            tier2055age[182]="74";
        	tier2055age[183]="74.00";
            tier2055age[184]="74.0";
            tier2055age[185]="74.25";
            tier2055age[186]="74.50";
            tier2055age[187]="74.5";
            tier2055age[188]="74.75";
            tier2055age[189]="75";
        	tier2055age[190]="75.00";
            tier2055age[191]="75.0";
            tier2055age[192]="75.25";
            tier2055age[193]="75.50";
            tier2055age[194]="75.5";
            tier2055age[195]="75.75";
            tier2055age[196]="76";
        	tier2055age[197]="76.00";
            tier2055age[198]="76.0";
            tier2055age[199]="76.25";
            tier2055age[200]="76.50";
            tier2055age[201]="76.5";
            tier2055age[202]="76.75";
            tier2055age[203]="77";
        	tier2055age[204]="77.00";
            tier2055age[205]="77.0";
            tier2055age[206]="77.25";
            tier2055age[207]="77.50";
            tier2055age[208]="77.5";
            tier2055age[209]="77.75";
            tier2055age[210]="78";
        	tier2055age[211]="78.00";
            tier2055age[212]="78.0";
            tier2055age[213]="78.25";
            tier2055age[214]="78.50";
            tier2055age[215]="78.5";
            tier2055age[216]="78.75";
            tier2055age[217]="79";
        	tier2055age[218]="79.00";
            tier2055age[219]="79.0";
            tier2055age[220]="79.25";
            tier2055age[221]="79.50";
            tier2055age[222]="79.5";
            tier2055age[223]="79.75";
            tier2055age[224]="80";
        	tier2055age[225]="80.00";
            tier2055age[226]="80.0";
            tier2055age[227]="80.25";
            tier2055age[228]="80.50";
            tier2055age[229]="80.5";
            tier2055age[230]="80.75";
       
	var tier2055factor = new Array(231);
tier2055factor[0]=0.74540000001;
        tier2055factor[1]=0.74540000001;
        tier2055factor[2]=0.74540000001;
		tier2055factor[3]=0.74540000001;
        tier2055factor[4]=0.74540000001;
        tier2055factor[5]=0.74540000001;
		tier2055factor[6]=0.74540000001;
        tier2055factor[7]=0.74540000001;
        tier2055factor[8]=0.74540000001;
		tier2055factor[9]=0.74540000001;
        tier2055factor[10]=0.74540000001;
        tier2055factor[11]=0.74540000001;
		tier2055factor[12]=0.74540000001;
        tier2055factor[13]=0.74540000001;
		tier2055factor[14]=0.74540000001;
        tier2055factor[15]=0.74540000001;
        tier2055factor[16]=0.74540000001;
        tier2055factor[17]=0.75610000001;
        tier2055factor[18]=0.76680000001;
        tier2055factor[19]=0.76680000001;
        tier2055factor[20]=0.77750000001;
        tier2055factor[21]=0.78820000001;
        tier2055factor[22]=0.78820000001;
        tier2055factor[23]=0.78820000001;
        tier2055factor[24]=0.79980000001;
        tier2055factor[25]=0.81140000001;
        tier2055factor[26]=0.81140000001;
        tier2055factor[27]=0.82300000001;
        tier2055factor[28]=0.83460000001;
        tier2055factor[29]=0.83460000001;
        tier2055factor[30]=0.83460000001;
        tier2055factor[31]=0.84720000001;
        tier2055factor[32]=0.85980000001;
        tier2055factor[33]=0.85980000001;
        tier2055factor[34]=0.87240000001;
        tier2055factor[35]=0.88500000001;
        tier2055factor[36]=0.88500000001;
        tier2055factor[37]=0.88500000001;
        tier2055factor[38]=0.89870000001;
        tier2055factor[39]=0.91250000001;
        tier2055factor[40]=0.91250000001;
        tier2055factor[41]=0.92620000001;
        tier2055factor[42]=0.93990000001;
        tier2055factor[43]=0.93990000001;
        tier2055factor[44]=0.93990000001;
        tier2055factor[45]=0.95490000001;
        tier2055factor[46]=0.96990000001;
        tier2055factor[47]=0.96990000001;
        tier2055factor[48]=0.98490000001;
        tier2055factor[49]=1.00000000001;
        tier2055factor[50]=1.00000000001;
        tier2055factor[51]=1.00000000001;
        tier2055factor[52]=1.01110000001;
        tier2055factor[53]=1.02230000001;
        tier2055factor[54]=1.02230000001;
        tier2055factor[55]=1.03350000001;
        tier2055factor[56]=1.04470000001;
        tier2055factor[57]=1.04470000001;
        tier2055factor[58]=1.04470000001;
        tier2055factor[59]=1.05970000001;
        tier2055factor[60]=1.07470000001;
        tier2055factor[61]=1.07470000001;
        tier2055factor[62]=1.08980000001;
        tier2055factor[63]=1.10480000001;
        tier2055factor[64]=1.10480000001;
		tier2055factor[65]=1.10480000001;
		tier2055factor[66]=1.12070000001;
        tier2055factor[67]=1.13670000001;
     	tier2055factor[68]=1.13670000001;
     	tier2055factor[69]=1.15260000001;
     	tier2055factor[70]=1.16860000001;
     	tier2055factor[71]=1.16860000001;
     	tier2055factor[72]=1.16860000001;
     	tier2055factor[73]=1.18550000001;
     	tier2055factor[74]=1.20250000001;
     	tier2055factor[75]=1.20250000001;
     	tier2055factor[76]=1.21950000001;
     	tier2055factor[77]=1.23650000001;
     	tier2055factor[78]=1.23650000001;
     	tier2055factor[79]=1.23650000001;
     	tier2055factor[80]=1.25470000001;
     	tier2055factor[81]=1.27290000001;
     	tier2055factor[82]=1.27290000001;
     	tier2055factor[83]=1.29110000001;
        tier2055factor[84]=1.30930000001;
        tier2055factor[85]=1.30930000001;
        tier2055factor[86]=1.30930000001;
        tier2055factor[87]=1.32210000001;
        tier2055factor[88]=1.33500000001;
        tier2055factor[89]=1.33500000001;
        tier2055factor[90]=1.34790000001;
        tier2055factor[91]=1.36080000001;
        tier2055factor[92]=1.36080000001;
        tier2055factor[93]=1.36080000001;
        tier2055factor[94]=1.37360000001;
        tier2055factor[95]=1.38650000001;
        tier2055factor[96]=1.38650000001;
        tier2055factor[97]=1.39940000001;
        tier2055factor[98]=1.41230000001;
        tier2055factor[99]=1.41230000001;
        tier2055factor[100]=1.41230000001;
        tier2055factor[101]=1.42510000001;
        tier2055factor[102]=1.43800000001;
        tier2055factor[103]=1.43800000001;
        tier2055factor[104]=1.45090000001;
        tier2055factor[105]=1.46380000001;
        tier2055factor[106]=1.46380000001;
        tier2055factor[107]=1.46380000001;
        tier2055factor[108]=1.47660000001;
        tier2055factor[109]=1.48950000001;
        tier2055factor[110]=1.48950000001;
        tier2055factor[111]=1.50240000001;
        tier2055factor[112]=1.51530000001;
        tier2055factor[113]=1.51530000001;
        tier2055factor[114]=1.51530000001;
        tier2055factor[115]=1.52810000001;
        tier2055factor[116]=1.54100000001;
        tier2055factor[117]=1.54100000001;
        tier2055factor[118]=1.55390000001;
        tier2055factor[119]=1.56680000001;
        tier2055factor[120]=1.56680000001;
        tier2055factor[121]=1.56680000001;
        tier2055factor[122]=1.56680000001;
     	tier2055factor[123]=1.56680000001;
     	tier2055factor[124]=1.56680000001;
     	tier2055factor[125]=1.56680000001;
     	tier2055factor[126]=1.56680000001;
     	tier2055factor[127]=1.56680000001;
     	tier2055factor[128]=1.56680000001;
     	tier2055factor[129]=1.56680000001;
     	tier2055factor[130]=1.56680000001;
       	tier2055factor[131]=1.56680000001; 
       	tier2055factor[132]=1.56680000001;
     	tier2055factor[133]=1.56680000001;
     	tier2055factor[134]=1.56680000001;
     	tier2055factor[135]=1.56680000001;
     	tier2055factor[136]=1.56680000001;
     	tier2055factor[137]=1.56680000001;
        tier2055factor[138]=1.56680000001;
        tier2055factor[139]=1.56680000001;
     	tier2055factor[140]=1.56680000001;
        tier2055factor[141]=1.56680000001;
        tier2055factor[142]=1.56680000001;
        tier2055factor[143]=1.56680000001;
        tier2055factor[144]=1.56680000001;
        tier2055factor[145]=1.56680000001;
        tier2055factor[146]=1.56680000001;
        tier2055factor[147]=1.56680000001;
        tier2055factor[148]=1.56680000001;
        tier2055factor[149]=1.56680000001;
        tier2055factor[150]=1.56680000001;
        tier2055factor[151]=1.56680000001;
        tier2055factor[152]=1.56680000001;
        tier2055factor[153]=1.56680000001;
        tier2055factor[154]=1.56680000001;
        tier2055factor[155]=1.56680000001;
        tier2055factor[156]=1.56680000001;
        tier2055factor[157]=1.56680000001;
        tier2055factor[158]=1.56680000001;
        tier2055factor[159]=1.56680000001;
        tier2055factor[160]=1.56680000001;
        tier2055factor[161]=1.56680000001;
        tier2055factor[162]=1.56680000001;
        tier2055factor[163]=1.56680000001;
        tier2055factor[164]=1.56680000001;
        tier2055factor[165]=1.56680000001;
        tier2055factor[166]=1.56680000001;
        tier2055factor[167]=1.56680000001;
        tier2055factor[168]=1.56680000001;
        tier2055factor[169]=1.56680000001;
		tier2055factor[170]=1.56680000001;
		tier2055factor[171]=1.56680000001;
		tier2055factor[172]=1.56680000001;
		tier2055factor[173]=1.56680000001;
		tier2055factor[174]=1.56680000001;
		tier2055factor[175]=1.56680000001;
		tier2055factor[176]=1.56680000001;
		tier2055factor[177]=1.56680000001;
		tier2055factor[178]=1.56680000001;
		tier2055factor[179]=1.56680000001;
		tier2055factor[180]=1.56680000001;
		tier2055factor[181]=1.56680000001;
		tier2055factor[182]=1.56680000001;
		tier2055factor[183]=1.56680000001;
		tier2055factor[184]=1.56680000001;
		tier2055factor[185]=1.56680000001;
		tier2055factor[186]=1.56680000001;
		tier2055factor[187]=1.56680000001;
		tier2055factor[188]=1.56680000001;
		tier2055factor[189]=1.56680000001;
		tier2055factor[190]=1.56680000001;
		tier2055factor[191]=1.56680000001;
		tier2055factor[192]=1.56680000001;
		tier2055factor[193]=1.56680000001;
		tier2055factor[194]=1.56680000001;
		tier2055factor[195]=1.56680000001;
		tier2055factor[196]=1.56680000001;
		tier2055factor[197]=1.56680000001;
		tier2055factor[198]=1.56680000001;
		tier2055factor[199]=1.56680000001;
		tier2055factor[200]=1.56680000001;
		tier2055factor[201]=1.56680000001;
		tier2055factor[202]=1.56680000001;
		tier2055factor[203]=1.56680000001;
		tier2055factor[204]=1.56680000001;
		tier2055factor[205]=1.56680000001;
		tier2055factor[206]=1.56680000001;
		tier2055factor[207]=1.56680000001;
		tier2055factor[208]=1.56680000001;
		tier2055factor[209]=1.56680000001;
		tier2055factor[210]=1.56680000001;
		tier2055factor[211]=1.56680000001;
		tier2055factor[212]=1.56680000001;
		tier2055factor[213]=1.56680000001;
		tier2055factor[214]=1.56680000001;
		tier2055factor[215]=1.56680000001;
		tier2055factor[216]=1.56680000001;
		tier2055factor[217]=1.56680000001;
		tier2055factor[218]=1.56680000001;
		tier2055factor[219]=1.56680000001;
		tier2055factor[220]=1.56680000001;
		tier2055factor[221]=1.56680000001;
		tier2055factor[222]=1.56680000001;
		tier2055factor[223]=1.56680000001;
		tier2055factor[224]=1.56680000001;
		tier2055factor[225]=1.56680000001;
		tier2055factor[226]=1.56680000001;
		tier2055factor[227]=1.56680000001;
		tier2055factor[228]=1.56680000001;
		tier2055factor[229]=1.56680000001;
		tier2055factor[230]=1.56680000001;
			 		    	        	           	    
	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < tier2055age.length; i++) {
		if (tier2055age[i] == selectedAge) {
			break;
		}
	}

   return tier2055factor[i];
}
// Determines and returns a tier1665 Age Factor to the calling function.
function gettier1665Factor() {
	var tier1665age = new Array (262);

	var tier1665factor = new Array(262);
   	         	        	           	    
	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < tier1665age.length; i++) {
		if (tier1665age[i] == selectedAge) {
			break;
		}
	}

   return tier1665factor[i];
}

// Determines and returns a safety355 Age Factor to the calling function.
function getsafety355Factor() {

	var safety355age = new Array (332);

	var safety355factor = new Array(332);
	        
	var selectedAge = document.SplitRetBenCalc.Age.value;
	for (var i = 0; i < safety355age.length; i++) {
		if (safety355age[i] == selectedAge) {
			break;
		}
	}

   return safety355factor[i];
}

// Deterimes the tier Type from the selected Radio button and returns
// it to the calling function.
function gettierType() {
	var selectedtype = document.SplitRetBenCalc;
	for (var i = 0; i < selectedtype.tiers.length; i++) {
	if (selectedtype.tiers[i].checked) {
	break
	}
	}
   return selectedtype.tiers[i].value;
}

//Validates that field is not empty.
function isEmpty(inputStr) {
	if (inputStr == "" || inputStr == null) {
		return true;
	}
		return false;
}

//Validates that number is in specified range.
function inRange(inputStr, lo, hi) {
	var num =parseInt(inputStr, 10);
	if (num < lo || num > hi) {
		return false;
	}
		return true;
}
function checkNumeric(objName,comma)
{
	var numberfield = objName;
	if (chkNumeric(objName,comma) == false)
	{
		numberfield.select();
		numberfield.focus();
		return false;
	}
	else
	{
		return true;
	}
}
function chkNumeric(objName,comma)
{
var checkOK = "0123456789." + comma;
var checkStr = objName;
var allValid = true;
var decPoints = 0;
var allNum = "";

for (i = 0;  i < checkStr.value.length;  i++)
{
ch = checkStr.value.charAt(i);
for (j = 0;  j < checkOK.length;  j++)
if (ch == checkOK.charAt(j))
break;
if (j == checkOK.length)
{
allValid = false;
break;
}
if (ch != ",")
allNum += ch;
}
if (!allValid)
{	
alertsay = "Please enter only these values \"" + checkOK + "\" in the Final Average Monthly Compensation field. Do not use dollar signs or commas.";
alertsay = alert(alertsay);
return (false);
}
}
	
		
//New Window for Minimum Requirements Specifications

function EligibilityNewWindow() {
	 var newContent= ""
	 var newWindow = window.open("","","status=1,height=450,width=550,top=25,left=25,resizable=1,scrollbars=1")

var newContent = "<HTML><HEAD><TITLE>Eligibility for Retirement</TITLE></HEAD>"
    newContent += "<BODY><b>Eligibility for Retirement</b><br>"
    newContent += "Members meeting the following eligibility requirements may file<br>"
    newContent += "an application for a service retirement allowance:<br>"
    newContent += "<br>"
    newContent += "General Members (tier I and tier II):"
    newContent += "<UL>"
    newContent += "<LI> Age 50 and 10 or more years of retirement service credit, or<br>"
    newContent += "<LI> 30 or more years of retirement service credit, regardless of age, or<br>"
    newContent += "<LI> Age 70, regardless of the amount of retirement service credit.<br>"
    newContent += "<LI> A part-time employee age 55 or older with 5 or more years of Service Credit and at least 10 years of active employment with an employer convered by OCERS.<br>"
    newContent += "</UL>"

    newContent += "Safety Members:"
    newContent += "<UL>"
    newContent += "<LI> Age 50 and 10 or more years of retirement service credit, or<br>"
    newContent += "<LI> 20 years or more of retirement service credit, regardless of age.<BR>"
    newContent += "<LI> Age 70, regardless of the amount of retirement service credit.<br>"
    newContent += "<LI> A part-time employee age 55 or older with 5 or more years of Service Credit and at least 10 years of active employment with an employer convered by OCERS.<br>"
    newContent += "</UL>"
    newContent += "Reciprocal service credit counts towards determining when a member<br>"
    newContent += "has accrued the minimum amount of service credit to qualify for retirement.<br>"
    newContent += "Previous county service purchased (e.g. extra help, part time or previous<br>"
    newContent += "membership) also counts towards the minimum service requirement. Public<br>"
    newContent += "service purchased (e.g. military time or federal civil service) is not<br>"
    newContent += "included in determining if a member has met the minimum service credit<br>"
    newContent += "requirement."
    newContent += "</BODY></HTML>"
    newWindow.document.write(newContent)
    newWindow.document.close() 
}

//New Window for Final Compensation Definition

function FinalCompNewWindow() {
	 var newContent= ""
	 var newWindow = window.open("","","status=1,height=525,width=650,top=25,left=25,resizable=1,scrollbars=1")

var newContent = "<HTML><HEAD><TITLE>Final Compensation Definition</TITLE></HEAD>"
    newContent += "<BODY><b>Final Compensation Definition</b><br>"
    newContent += "Element to be Included in 'Compensation Earnable'. Remuneration earned and receivable in cash<br>"
    newContent += "(under applicable MOU) to the retiring employee during the final compensation period for working <br>"
    newContent += "the ordinary time required of other employees in the same grade/class shall be included in<br>"
    newContent += "'compensation earnable', including but not limited to the following items of compensation, and others substantially similar to them<br>"
         
    newContent += "<UL>"
    newContent += "<LI>Base Salary and Wages<br>"
    newContent += "<LI>Bilingual Premium Pay<br>"
    newContent += "<LI>Educational Incentive ('POST') Pay<br>"
    newContent += "<LI>Aircraft Rescue Firefighting<br>"
    newContent += "<LI>Paramedic Pay<br>"
    newContent += "<LI>Motorcycle Bonus<br>"
    newContent += "<LI>Emergency Dispatch Pay<br>"   
    newContent += "<LI>Field Training Officer Bonus<br>"
    newContent += "<LI>Shift differential Pay<br>"
    newContent += "<LI>Confined Space Pay<br>"
    newContent += "<LI>Longevity Incentive<br>"
    newContent += "<LI>Automobile Allowance (paid in cash or to extent automobile provided for personal use and declared as income)<br>"
    newContent += "<LI>Uniform Allowance<br>"
    newContent += "<LI>Uniform Maintenance Allowance<br>"
    newContent += "<LI>Payoffs of Vacation and Sick Leave and Holiday to the extent earned (pro-rated on a monthly basis), not taken as time off and permitted to be cashed-out (pro-rated on a monthly basis) under the applicable MOU regardless of when actually cashed-out<br>"
    newContent += "<LI>'Overtime' required to be worked that is ordinarily worked by others in same grade/class/rate of pay<br>"
    newContent += "<LI>Compensatory Time (if not excluded as 'true overtime' (see definition in section 2) and to the extent in excess of minimum required reserve)<br>"
    newContent += "<LI><b>'Madera'</b> Pay<br>"
    newContent += "<LI>Additional Compensation for Scheduled Meal Periods<br>"
    newContent += "<LI>Flexible Benefits ('Cafeteria Plan') to the Extent paid in Cash (applicable to members retiring before January 1, 1991)<br>"
    newContent += "</UL></p>"
    newContent += "</BODY></HTML>"
    newWindow.document.write(newContent)
    newWindow.document.close() 
}

/* end Retirement Split Calculator */
}