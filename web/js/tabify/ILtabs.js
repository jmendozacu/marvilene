//arrays of objects to collect previous and current tab
var previous = [];
var current = [];
//array to store IDs of our tabs
//store setInterval reference
var tablist = [];
 
//change tab and highlight current tab title
function change(block){
 //don't do anything if it's the same tab
 if(current[block].reference == previous[block].reference) return;
 //show proper tab, catch IE6 bug
 if (jQuery.browser.msie && jQuery.browser.version.substr(0,3) == "6.0")
 jQuery(block + ' .tab#' + current[block].reference).show();
 else
 jQuery(block + ' .tab#' + current[block].reference).fadeIn();
 
 //clear highlight from previous tab title
 jQuery(block + ' .htabs a[href=#' + previous[block].reference + ']').removeClass('select');
 
 //highlight currenttab title
 jQuery(block + ' .htabs a[href=#' + current[block].reference + ']').addClass('select');
 
 //hide the other tabs
 jQuery("#" + previous[block].reference).hide();
 //stores a reference to the current tab in advance for the next iteration or click
 previous[block].reference = current[block].reference;
}
function Tab(blockid){
 var z = 0;
 //stores self ID internally
 this.block = blockid;
 //function to rotate internal tabs
 this.next = function (){
 //store references to current and next tab
 previous[this.block].reference = jQuery(this.block + ' .htabs a').get()[z].href.split('#')[1];
 if(z >= jQuery(this.block + ' .htabs a').get().length-1) z = 0; else z++;
 current[this.block].reference  = jQuery(this.block + ' .htabs a').get()[z].href.split('#')[1];
 //advance to next tab
 change(this.block);
 };
}
 
function Reference(reference){ this.reference = reference; }
function tabs(tobj){
 
 for (key in tobj) {
 
 var params = tobj[key].split('&');
 var block = params[0];
 
 //initialize tabs, display the current tab
 jQuery(block + " .tab:not(:first)").hide();
 jQuery(block + " .tab:first").show();
 
 //highlight the current tab title
 jQuery(block + ' .htabs a:first').addClass('select');
 
 //stores reference to first tab when function starts, tab 1 from left to right
 previous[block] = new Reference(jQuery(block + " .htabs a:first").attr("href").split('#')[1]);
 
 //stores reference to second tab when the function starts, tab 2 from left to right
 current[block]  = new Reference(jQuery(block + ' .htabs a').get()[1].href.split('#')[1]);
 
 //create new Tab object to store values for rotation and setInterval id
 tablist[block] = new Tab(block);
 
 //skip if no speed is defined
 if (params[1] != undefined) {
  //set interval to repeat - next line commented
  interid = setInterval("tablist['" + block + "'].next()", params[1]);
  //store in - next line commented
  tablist[block].intervalid = interid;
 }
 
 //handler for tab clicking
 jQuery(block + " .htabs a").click(function(event){
  //store reference to clicked tab
  target = "#"+event.target.getAttribute("href").split('#')[1];
  tblock = "#"+jQuery(target).parent().parent().attr("id");
 
  current[tblock].reference = jQuery(this).attr("href").split('#')[1];
 
  //display referenced tab
  change(tblock);
 
  //if tab is clicked, stop rotating
  clearInterval(tablist[tblock].intervalid);
 
  return false;
 });
 }
 }