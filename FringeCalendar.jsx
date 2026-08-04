import { useState, useMemo, useRef, useEffect, useCallback, Component } from "react";
var LZString=function(){var r=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",e={};function t(r,o){if(!e[r]){e[r]={};for(var n=0;n<r.length;n++)e[r][r.charAt(n)]=n}return e[r][o]}var i={compressToBase64:function(r){if(null==r)return"";var n=i._compress(r,6,function(r){return o.charAt(r)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(n){return t(o,r.charAt(n))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(r){return null==r?"":""==r?null:i._decompress(r.length,16384,function(o){return r.charCodeAt(o)-32})},compressToUint8Array:function(r){for(var o=i.compress(r),n=new Uint8Array(2*o.length),e=0,t=o.length;e<t;e++){var s=o.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null==o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;e<t;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(r){return null==r?"":i._compress(r,6,function(r){return n.charAt(r)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(o){return t(n,r.charAt(o))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(r,o,n){if(null==r)return"";var e,t,i,s={},u={},a="",p="",c="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<r.length;i+=1)if(a=r.charAt(i),Object.prototype.hasOwnProperty.call(s,a)||(s[a]=f++,u[a]=!0),p=c+a,Object.prototype.hasOwnProperty.call(s,p))c=p;else{if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++),s[p]=f++,c=String(a)}if(""!==c){if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==o-1){d.push(n(m));break}v++}return d.join("")},decompress:function(r){return null==r?"":""==r?null:i._decompress(r.length,32768,function(o){return r.charCodeAt(o)})},_decompress:function(o,n,e){var t,i,s,u,a,p,c,l=[],f=4,h=4,d=3,m="",v=[],g={val:e(0),position:n,index:1};for(t=0;t<3;t+=1)l[t]=t;for(s=0,a=Math.pow(2,2),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 2:return""}for(l[3]=c,i=c,v.push(c);;){if(g.index>o)return"";for(s=0,a=Math.pow(2,d),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(c=s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 2:return v.join("")}if(0==f&&(f=Math.pow(2,d),d++),l[c])m=l[c];else{if(c!==h)return null;m=i+i.charAt(0)}v.push(m),l[h++]=i+m.charAt(0),i=m,0==--f&&(f=Math.pow(2,d),d++)}}};return i}();

import Papa from "papaparse";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdAFEpJDVvI1L_f5GgtZjscx7IyDlbDma2nwlFqZt-UdbeoXNwDOOijfZtV6jmeDmKkpD6BDD3fZ1y/pub?output=csv";
// Full Fringe catalogue: the "All" tab of Jo's sheet (headers in row 1, ~4000 rows), read directly
// via the gviz CSV endpoint (works because the sheet is shared "anyone with the link can view").
const ALL_CSV_URL = "https://docs.google.com/spreadsheets/d/15aHnYGBL73-n6MOf2Su1hlEG7FxReUjEyc90_AZugB0/gviz/tq?tqx=out:csv&sheet=All&headers=1";
// Bump when a change alters saved-data shape; runs migrations + shows a one-time "site updated" notice.
const APP_DATA_VERSION = 1;
const HELP_URL = "https://docs.google.com/spreadsheets/d/15aHnYGBL73-n6MOf2Su1hlEG7FxReUjEyc90_AZugB0/gviz/tq?tqx=out:csv&sheet="+encodeURIComponent("Help - me");
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6HNRYWBhQ2GoTV_30wGZ-xpHPbYdSqswePtgracYR8rQ_PATiCX5J1-u2rxb8jErf/exec";
const JOPICKS_CSV_URL = ""; // paste the published-CSV URL of the sheet's "JoPicks" tab to switch on the static #jolive link

const FALLBACK_SHOWS = [
  { booked:1, name:"Olga Koch: Fat Tom Cruise", link:"https://edfest.com/whats-on/olga-koch-fat-tom-cruise", price:"£19", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"17:30", end:"18:30", duration:"1h", ltf:true, date:"2026-08-05", attendees:"Me", tickets:1, address:"Pleasance Courtyard, 60 Pleasance, EH8 9TJ", notes:"" },
  { booked:1, name:"Margaret Thatcher Queen of Hollywood", link:"https://edfest.com/whats-on/margaret-thatcher-queen-of-hollywood", price:"£13", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"20:40", end:"21:45", duration:"1h05", ltf:true, date:"2026-08-05", attendees:"Me, Pippa", tickets:2, address:"George Square, Edinburgh, EH8 9JZ", notes:"" },
  { booked:1, name:"The Bloody Ballad of Bette Davis", link:"https://edfest.com/whats-on/the-bloody-ballad-of-bette-davis", price:"£15", organiser:"Assembly", venue:"Assembly Roxy", start:"15:00", end:"16:00", duration:"1h", ltf:true, date:"2026-08-06", attendees:"Me, Mum", tickets:2, address:"2 Roxburgh Place, Edinburgh, EH8 9SU", notes:"" },
  { booked:1, name:"Fiona Allen: White Lies", link:"https://edfest.com/whats-on/fiona-allen-white-lies", price:"£16", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"18:00", end:"19:00", duration:"1h", ltf:false, date:"2026-08-06", attendees:"Me, Mum", tickets:2, address:"Teviot Row House, 13 Bristo Square, Edinburgh, EH8 9AJ", notes:"" },
  { booked:1, name:"Susie McCabe: Best Behaviour", link:"https://edfest.com/whats-on/susie-mccabe-coming-of-rage", price:"£16", organiser:"Assembly", venue:"Assembly George Square", start:"20:45", end:"21:45", duration:"1h", ltf:true, date:"2026-08-06", attendees:"Me, Mum", tickets:2, address:"George Square, Edinburgh, EH8 9LK", notes:"" },
  { booked:1, name:"Christopher Hall: Pizazz", link:"https://edfest.com/whats-on/christopher-hall-pizazz", price:"£16", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"20:20", end:"21:20", duration:"1h", ltf:false, date:"2026-08-10", attendees:"Me, Chlobo", tickets:2, address:"Teviot Row House, 13 Bristo Square, Edinburgh, EH8 9AJ", notes:"" },
  { booked:1, name:"Kim Blythe: Puzzle", link:"https://edfest.com/whats-on/kim-blythe-puzzle", price:"£16", organiser:"Gilded Balloon", venue:"Gilded Balloon Patter House", start:"19:00", end:"20:00", duration:"1h", ltf:false, date:"2026-08-11", attendees:"Me, StephY", tickets:2, address:"3 Chambers St, Edinburgh, EH1 1HT", notes:"" },
  { booked:1, name:"Abandoman: Afterglow", link:"https://edfest.com/whats-on/abandoman-afterglow", price:"£22", organiser:"Underbelly", venue:"Underbelly Cowgate", start:"20:55", end:"21:55", duration:"1h", ltf:true, date:"2026-08-14", attendees:"Me, Pippa", tickets:2, address:"66 Cowgate, Edinburgh, EH1 1JX", notes:"" },
  { booked:0, name:"Keep It Tight Podcast Live", link:"", price:"£16", organiser:"The Stand", venue:"28 York Place", start:"12:15", end:"13:15", duration:"1h", ltf:false, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"", notes:"" },
  { booked:1, name:"Sarah Hester Ross: Serving C*nt", link:"https://edfest.com/whats-on/sarah-hester-ross-serving-cnt", price:"£15", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"16:20", end:"17:20", duration:"1h", ltf:false, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"Teviot Row House, 13 Bristo Square, Edinburgh, EH8 9AJ", notes:"" },
  { booked:1, name:"Geraldine Hickey: A Weight Off My Chest", link:"https://edfest.com/whats-on/geraldine-hickey-a-weight-off-my-chest", price:"£13", organiser:"Assembly", venue:"Assembly George Square Studios", start:"18:40", end:"19:40", duration:"1h", ltf:true, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"George Square, Edinburgh, EH8 9LH", notes:"" },
  { booked:1, name:"Robin Grainger: Lemonade", link:"https://edfest.com/whats-on/robin-grainger-lemonade", price:"£16", organiser:"Assembly", venue:"Assembly George Square", start:"20:20", end:"21:20", duration:"1h", ltf:true, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"George Square, Edinburgh, EH8 9LK", notes:"" },
  { booked:1, name:"Best of the Fest", link:"https://edfest.com/whats-on/best-of-the-fest", price:"£18", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"23:55", end:"01:10", duration:"1h15", ltf:true, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"George Square, Edinburgh, EH8 9JZ", notes:"" },
  { booked:1, name:"YUCK Circus: Naughties", link:"https://edfest.com/whats-on/yuck-circus-naughties", price:"£22", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"16:40", end:"17:40", duration:"1h", ltf:true, date:"2026-08-16", attendees:"Me, Ally, SophsT", tickets:3, address:"George Square, Edinburgh, EH8 9JZ", notes:"" },
  { booked:1, name:"Tom Read Wilson: A-Z of Me", link:"https://edfest.com/whats-on/tom-read-wilson-a-z-of-me", price:"£12", organiser:"Gilded Balloon", venue:"Gilded Balloon at the Museum", start:"19:30", end:"20:30", duration:"1h", ltf:false, date:"2026-08-16", attendees:"Me, Ally, SophsT", tickets:3, address:"Lothian Street, Edinburgh, EH1 1HB", notes:"" },
  { booked:1, name:"Siegfried & Joy: Las Vegas in Edinburgh", link:"https://edfest.com/whats-on/siegfried-joy-las-vegas-in-edinburgh", price:"£19", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"20:00", end:"21:00", duration:"1h", ltf:true, date:"2026-08-16", attendees:"Rach", tickets:2, address:"George Square, Edinburgh, EH8 9JZ", notes:"£8 each" },
  { booked:1, name:"Rosco McClelland: Foodbank Fundraiser", link:"https://edfest.com/whats-on/rosco-mcclelland-and-friends-a-foodbank-fundraiser", price:"£17", organiser:"Assembly", venue:"Assembly George Square Studios", start:"18:25", end:"19:25", duration:"1h", ltf:true, date:"2026-08-17", attendees:"Me, FiRalph", tickets:2, address:"George Square, Edinburgh, EH8 9LH", notes:"" },
  { booked:1, name:"Hard to Swallow: Reuben Kaye", link:"https://edfest.com/whats-on/hard-to-swallow-reuben-kaye", price:"£22", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"20:00", end:"21:05", duration:"1h05", ltf:true, date:"2026-08-21", attendees:"Me, LisaMo, Pippa", tickets:3, address:"George Square, Edinburgh, EH8 9JZ", notes:"" },
  { booked:1, name:"Otto and Astrid", link:"https://edfest.com/whats-on/otto-astrid-the-stages-tour", price:"", organiser:"Assembly", venue:"Assembly Roxy", start:"21:20", end:"22:30", duration:"1h10", ltf:false, date:"2026-08-21", attendees:"Me, LisaMo, Pippa", tickets:3, address:"2 Roxburgh Place, Edinburgh, EH8 9SU", notes:"" },
  { booked:1, name:"Kiell Smith-Bynoe: Kool Story Bro", link:"https://edfest.com/whats-on/kiell-smith-bynoes-kool-story-bro", price:"£21", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"23:15", end:"00:15", duration:"1h", ltf:false, date:"2026-08-21", attendees:"Me, LisaMo, Pippa", tickets:3, address:"Pleasance Courtyard, 60 Pleasance, EH8 9TJ", notes:"" },
  { booked:1, name:"Maisie Adam: Comedy at the Fringe", link:"https://edfest.com/whats-on/maisie-adam-presents-comedy-at-the-fringe", price:"Free", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"16:00", end:"17:00", duration:"1h", ltf:false, date:"2026-08-25", attendees:"Me, Mum", tickets:2, address:"Pleasance Courtyard, 60 Pleasance, EH8 9TJ", notes:"" },
  { booked:1, name:"The Kaye Hole: Reuben Kaye", link:"https://edfest.com/whats-on/the-kaye-hole-hosted-by-reuben-kaye", price:"£24", organiser:"Underbelly", venue:"Underbelly Bristo Square", start:"23:30", end:"01:00", duration:"1h30", ltf:false, date:"2026-08-28", attendees:"Me", tickets:1, address:"Bristo Square, Edinburgh, EH8 9AG", notes:"" },
  { booked:1, name:"Hot Dub Time Machine: House Party", link:"https://edfest.com/whats-on/hot-dub-time-machine-presents-house-party", price:"£30", organiser:"Assembly", venue:"Assembly Hall", start:"23:00", end:"01:00", duration:"2h", ltf:true, date:"2026-08-29", attendees:"Me, FiRalph", tickets:2, address:"Mound Place, Edinburgh, EH1 2LU", notes:"" },
];
const FALLBACK_WISHLIST = [
  { name:"5 Mistakes That Changed History", organiser:"Assembly", venue:"Assembly George Square", start:"12:40", price:"", ltf:false },
  { name:"Joe Lycett & Friends", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"15:30", price:"£21", ltf:false },
  { name:"Ruby Wax: Absolutely Famous", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"15:30", price:"£23", ltf:false },
  { name:"Rosie Jones: I Can't Tell What She's Saying", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"16:00", price:"£18", ltf:false },
  { name:"Russell Howard: Work in Progress", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"16:00", price:"£16", ltf:false },
  { name:"Showstopper! The Improvised Musical", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"17:20", price:"£26", ltf:false },
  { name:"Annie Boyle: To All The Boys I've Loved Before", organiser:"Underbelly", venue:"Underbelly Bristo Square", start:"17:25", price:"£15", ltf:true },
  { name:"Julian Clary: Fully Dilated", organiser:"Assembly", venue:"Assembly Rooms", start:"17:30", price:"£18", ltf:false },
  { name:"NewsRevue", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"18:00", price:"£20", ltf:false },
  { name:"In Pour Taste", organiser:"Assembly", venue:"Assembly Rooms", start:"18:30", price:"£28", ltf:false },
  { name:"Sophie Garrad: A Period Drama", organiser:"Pleasance", venue:"Pleasance Dome", start:"18:50", price:"£17", ltf:false },
  { name:"David O'Doherty: At This Stage", organiser:"Assembly", venue:"Assembly George Square", start:"19:10", price:"", ltf:false },
  { name:"Nina's C*nti Cabaret", organiser:"Underbelly", venue:"Underbelly Bristo Square", start:"19:15", price:"£27", ltf:false },
  { name:"Colin Cloud: Hoax", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"19:30", price:"£20", ltf:false },
  { name:"Emma Doran: Emmaculate", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"19:30", price:"£20", ltf:false },
  { name:"Jack Docherty", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"19:30", price:"£15", ltf:false },
  { name:"Paul Black: Cash Cow", organiser:"Gilded Balloon", venue:"Gilded Balloon at the Museum", start:"19:30", price:"£18", ltf:false },
  { name:"Tia Kofi: The Final FronTia Live", organiser:"Gilded Balloon", venue:"Gilded Saloon", start:"19:40", price:"£15", ltf:false },
  { name:"Grace Campbell: The Lady Is a Tramp", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"20:30", price:"£19", ltf:false },
  { name:"MCU: Musical Comedians Unite!", organiser:"Gilded Balloon", venue:"Gilded Balloon Patter House", start:"20:40", price:"£14", ltf:false },
  { name:"Karen Dunbar: Chirpy", organiser:"Just The Tonic", venue:"Just the Tonic Nucleus", start:"20:45", price:"£21", ltf:false },
  { name:"All Killa No Filla: Live!", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"21:30", price:"£25", ltf:false },
  { name:"Chris & Lizzie Hall: Stay Hydrated Live!", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"21:45", price:"£15", ltf:false },
  { name:"Sophie's Surprise 29th", organiser:"Underbelly", venue:"Underbelly Circus Hub", start:"21:45", price:"£22", ltf:false },
  { name:"Share the Craic", organiser:"Underbelly", venue:"Underbelly George Square", start:"22:20", price:"£15", ltf:true },
  { name:"FLIGHT", organiser:"Assembly", venue:"Assembly George Square", start:"", price:"£13", ltf:true },
];

const OC = {
  "Assembly":       { bg: "#FF4D6A", glow: "rgba(255,77,106,0.3)" },
  "Pleasance":      { bg: "#FFBA08", glow: "rgba(255,186,8,0.3)" },
  "Gilded Balloon": { bg: "#FF6FB7", glow: "rgba(255,111,183,0.3)" },
  "Underbelly":     { bg: "#A855F7", glow: "rgba(168,85,247,0.3)" },
  "The Stand":      { bg: "#3B82F6", glow: "rgba(59,130,246,0.3)" },
  "Just The Tonic": { bg: "#F97316", glow: "rgba(249,115,22,0.3)" },
  "Monkey Barrel":  { bg: "#22C55E", glow: "rgba(34,197,94,0.3)" },
  "PBH's Free Fringe": { bg: "#14B8A6", glow: "rgba(20,184,166,0.3)" },
  "Other":          { bg: "#64748B", glow: "rgba(100,116,139,0.3)" },
};
const BG = "var(--bg)";
const CARD = "var(--card)";
const CARD_BORDER = "var(--card-border)";
const TXT = "var(--txt)";
const TXT2 = "var(--txt2)";
const TXT3 = "var(--txt3)";
const ACCENT = "linear-gradient(135deg, #FF4D6A, #A855F7)";

const DAY_NAMES_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_FULL = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const ALLOWED_DOMAINS = ["edfest.com","edfringe.com","pleasance.co.uk","assemblyfestival.com","assemblyfest.com","gildedballoon.co.uk","justthetonic.com","monkeybarrelcomedy.co.uk","monkeybarrelcomedy.com","thestand.co.uk","underbellyedinburgh.co.uk","underbelly.co.uk"];

function parseTime(t){if(!t)return null;const c=t.trim().replace(/:\d{2}$/,"");if(!/^\d{1,2}:\d{2}$/.test(c))return null;return c;}
function parseDate(d){if(!d)return null;const p=d.trim().split("/");if(p.length!==3)return null;const[dd,mm,yyyy]=p;if(!dd||!mm||!yyyy||yyyy.length!==4)return null;return`${yyyy}-${mm.padStart(2,"0")}-${dd.padStart(2,"0")}`;}
function parseDuration(s,e){const sm=timeToMinutes(parseTime(s));const em=timeToMinutes(parseTime(e));if(sm===null||em===null)return"";let d=em-sm;if(d<=0)d+=24*60;const h=Math.floor(d/60);const m=d%60;if(h&&m)return`${h}h${m.toString().padStart(2,"0")}`;if(h)return`${h}h`;return`${m}m`;}
function durationMinutes(show){const s=timeToMinutes(show.start);const e=timeToMinutes(show.end);if(s===null||e===null)return 0;let d=e-s;if(d<=0)d+=24*60;return d;}
function parseCSVToShows(csv){
  const r=Papa.parse(csv,{skipEmptyLines:true});
  const rows=r.data;
  if(rows.length<2)return{shows:[],wishlist:[]};
  // Match columns BY HEADER NAME (first match) so re-ordering the sheet can't break this.
  const hdr=rows[0].map(h=>(h||"").toString().trim().toLowerCase());
  const col=n=>hdr.indexOf(n.toLowerCase());
  const colAny=(...names)=>{for(const n of names){const k=hdr.indexOf(n.toLowerCase());if(k>=0)return k;}return -1;};
  const iName=col("name of show"),iLink=col("link"),iPrice=col("price"),
        iOrg=col("organiser"),iVenue=col("where showing"),iStart=col("time start"),
        iEnd=col("time end"),iLtf=col("lovethefringe"),iBooked=col("booked"),
        iDate=col("date"),iAtt=col("additional tickets"),iTix=col("total tix"),
        iNotes=col("notes"),iAddr=col("address"),iAvail=col("availability"),iVenueCode=col("venue #"),iGenre=col("genre"),iJoCat=col("jo category"),iLat=colAny("latitude","lat"),iLng=colAny("longitude","long","lng","lon");
  const g=(row,i)=>i>=0&&row[i]!=null?String(row[i]).trim():"";
  const pf=(row,i)=>{const n=parseFloat(g(row,i));return isNaN(n)?null:n;};
  const shows=[],wishlist=[];
  for(let k=1;k<rows.length;k++){
    const row=rows[k];
    const name=g(row,iName);
    if(!name)continue;
    const date=parseDate(g(row,iDate));
    const show={name,link:g(row,iLink),price:g(row,iPrice),organiser:g(row,iOrg),
      venue:g(row,iVenue),start:parseTime(g(row,iStart)),end:parseTime(g(row,iEnd)),
      duration:parseDuration(g(row,iStart),g(row,iEnd)),
      ltf:g(row,iLtf).toLowerCase()==="yes",booked:g(row,iBooked).toLowerCase()==="yes"?1:0,
      date,attendees:g(row,iAtt),tickets:parseInt(g(row,iTix))||0,venueCode:g(row,iVenueCode),
      notes:g(row,iNotes),address:g(row,iAddr),fullAddress:(g(row,20)||g(row,iAddr)),availability:g(row,iAvail),genres:g(row,iGenre),joCat:g(row,iJoCat),lat:pf(row,iLat),lng:pf(row,iLng)};
    if(date)shows.push(show);else wishlist.push(show);
  }
  return{shows,wishlist};
}
function timeToMinutes(t){if(!t)return null;const[h,m]=t.split(":").map(Number);return h*60+m;}
function formatTime(t){if(!t)return"";const[h,m]=t.split(":");const hr=parseInt(h);const ap=hr>=12?"pm":"am";const h12=hr===0?12:hr>12?hr-12:hr;return`${h12}:${m}${ap}`;}
function formatHour(min){const h=Math.floor(min/60);const ap=h>=12?"pm":"am";const h12=h===0?12:h>12?h-12:h;return`${h12}${ap}`;}
function getMonday(ds){const d=new Date(ds+"T12:00:00");const day=d.getDay();const diff=day===0?-6:1-day;const m=new Date(d);m.setDate(m.getDate()+diff);return m;}
function dateToStr(d){return d.toISOString().slice(0,10);}
function addDays(d,n){const r=new Date(d);r.setDate(r.getDate()+n);return r;}
function getWeeks(shows){const m=new Set();shows.filter(s=>s.date).forEach(s=>m.add(dateToStr(getMonday(s.date))));return[...m].sort();}
function extractPostcode(a){if(!a)return null;const m=a.match(/[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}/i);return m?m[0]:null;}
function ThemeToggle({theme,set}){
  const [open,setOpen]=useState(false);
  const ib={width:34,height:32,display:"inline-flex",alignItems:"center",justifyContent:"center",borderRadius:8,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:15,cursor:"pointer",flexShrink:0};
  if(!open) return <button onClick={()=>setOpen(true)} aria-label="Change theme" title="Theme" style={ib}>{theme==="light"?"☀️":"🌙"}</button>;
  return <div style={{display:"inline-flex",borderRadius:8,border:`1px solid ${CARD_BORDER}`,overflow:"hidden",flexShrink:0}}>{["dark","light"].map(id=><button key={id} onClick={()=>{set(id);setOpen(false);}} title={id==="dark"?"Dark":"Light"} style={{padding:"5px 9px",border:"none",cursor:"pointer",fontSize:14,background:theme===id?"#a855f7":"transparent",color:theme===id?"#fff":TXT2}}>{id==="dark"?"🌙":"☀️"}</button>)}</div>;
}
function exportAllData(){try{var o={};for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf("fringe")===0)o[k]=localStorage.getItem(k);}return LZString.compressToEncodedURIComponent(JSON.stringify(o));}catch(e){return "";}}
function importAllData(token){try{var o=JSON.parse(LZString.decompressFromEncodedURIComponent(token));if(!o||typeof o!=="object")return false;Object.keys(o).forEach(function(k){if(k.indexOf("fringe")===0)localStorage.setItem(k,o[k]);});return true;}catch(e){return false;}}
function SyncModal({onClose}){
  const [tok,setTok]=useState("");
  const link=(typeof window!=="undefined"?window.location.origin+window.location.pathname:"")+"#sync="+exportAllData();
  const copy=()=>{try{navigator.clipboard.writeText(link);}catch(e){}try{window.prompt("Copy this link, then open it on your other device:",link);}catch(e){}};
  const doImport=()=>{let t=(tok||"").trim();const m=t.match(/[#&]sync=([^&\s]+)/);if(m)t=m[1];if(t&&importAllData(t)){try{window.location.replace(window.location.pathname);}catch(e){}}else{try{window.alert("Couldn\u2019t read that link or code.");}catch(e){}}};
  const acc={width:"100%",padding:"11px",borderRadius:11,border:"none",background:ACCENT,color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"};
  return (<div onClick={onClose} onKeyDown={e=>{if(e.key==="Escape")onClose();}} tabIndex={-1} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:1400,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 12px",overflowY:"auto"}}>
    <div role="dialog" aria-modal="true" aria-label="Copy my data to another device" onClick={e=>e.stopPropagation()} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:16,maxWidth:460,width:"100%",padding:"20px",position:"relative"}}>
      <button onClick={onClose} aria-label="Close" style={{position:"absolute",top:12,right:12,background:"none",border:"none",color:TXT2,fontSize:20,cursor:"pointer"}}>✕</button>
      <div style={{fontSize:18,fontWeight:900,marginBottom:4,color:TXT}}>Copy my data to another device</div>
      <div style={{fontSize:13,color:TXT2,lineHeight:1.5,marginBottom:16}}>One link moves everything saved on this device — your reviews, tags, Pitch-a-Day proposals and settings. No login needed.</div>
      <button onClick={copy} style={acc}>⧉ Copy my transfer link</button>
      <div style={{textAlign:"center",fontSize:12,color:TXT3,margin:"14px 0 8px"}}>— then on the other device —</div>
      <input value={tok} onChange={e=>setTok(e.target.value)} placeholder="Paste the link or code here" aria-label="Paste transfer link or code" style={{width:"100%",padding:"10px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"var(--card)",color:TXT,fontSize:13,boxSizing:"border-box"}}/>
      <button onClick={doImport} style={{width:"100%",marginTop:8,padding:"10px",borderRadius:11,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT,fontSize:14,fontWeight:800,cursor:"pointer"}}>Import & replace this device’s data</button>
    </div>
  </div>);
}
function mapsUrl(x){if(x&&typeof x==="object"){const la=x.lat,ln=x.lng;if(la!=null&&ln!=null&&!isNaN(la)&&!isNaN(ln))return`https://www.google.com/maps/search/?api=1&query=${la},${ln}`;x=x.fullAddress||x.address||x.venue||"";}return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(x||"")}`;}
function pad2(n){return String(n).padStart(2,"0");}
function fIcsStamp(dateISO,hm){const[y,mo,da]=dateISO.split("-");const[h,mi]=(hm||"00:00").split(":");return `${y}${mo}${da}T${pad2(h)}${pad2(mi)}00`;}
function fAddDayISO(dateISO){const d=new Date(dateISO+"T12:00:00");d.setDate(d.getDate()+1);return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;}
function fEndInfo(s){let endDate=s.date,end=s.end||s.start||"00:00";if(s.end&&s.start&&timeToMinutes(s.end)<=timeToMinutes(s.start))endDate=fAddDayISO(s.date);return{endDate,end};}
function icsForShow(s){const start=s.start||"00:00";const{endDate,end}=fEndInfo(s);const esc=t=>String(t||"").replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n");const uid=(String(s.name)+s.date+start).toLowerCase().replace(/[^a-z0-9]+/g,"-")+"@fringe-app";const desc=[s.price?("Price: "+s.price):"",s.notes||""].filter(Boolean).join("\n");const lines=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//fringe-app//EN","CALSCALE:GREGORIAN","BEGIN:VEVENT","UID:"+uid,"DTSTAMP:"+fIcsStamp(s.date,start),"DTSTART:"+fIcsStamp(s.date,start),"DTEND:"+fIcsStamp(endDate,end),"SUMMARY:"+esc(s.name+(s.venue?(" | "+s.venue):"")),s.address?("LOCATION:"+esc(s.address)):"",s.link?("URL:"+esc(s.link)):"","DESCRIPTION:"+esc(desc),"BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:Reminder","TRIGGER:-PT1H","END:VALARM","BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:Reminder","TRIGGER:-PT30M","END:VALARM","END:VEVENT","END:VCALENDAR"].filter(Boolean);return lines.join("\r\n");}
function csvRows(text){const rows=[];let row=[],cell="",inQ=false;for(let i=0;i<text.length;i++){const ch=text[i];if(inQ){if(ch==='"'){if(text[i+1]==='"'){cell+='"';i++;}else inQ=false;}else cell+=ch;}else{if(ch==='"')inQ=true;else if(ch===","){row.push(cell);cell="";}else if(ch==="\n"){row.push(cell);rows.push(row);row=[];cell="";}else if(ch!=="\r")cell+=ch;}}if(cell!==""||row.length){row.push(cell);rows.push(row);}return rows;}
function normCatTime(t){if(!t)return "";const m=String(t).trim().match(/^(\d{1,2}):(\d{2})/);return m?`${m[1].padStart(2,"0")}:${m[2]}`:"";}
function normCatDur(d){if(!d)return "";const s=String(d).trim();let m=s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);if(m){const h=parseInt(m[1]),mm=parseInt(m[2]);return h>0?(mm>0?`${h}h${String(mm).padStart(2,"0")}`:`${h}h`):`${mm}m`;}m=s.match(/^(\d+)$/);if(m){const t=parseInt(m[1]);const h=Math.floor(t/60),mm=t%60;return h>0?(mm>0?`${h}h${String(mm).padStart(2,"0")}`:`${h}h`):`${mm}m`;}return s;}
function parseCatalogCSV(text){const rows=csvRows(text);if(rows.length<2)return[];let hri=-1;for(let i=0;i<Math.min(rows.length,6);i++){if(rows[i].some(cell=>String(cell||"").trim().toLowerCase()==="title")){hri=i;break;}}if(hri<0)return[];const hdr=rows[hri].map(h=>String(h||"").trim().toLowerCase());const ix=names=>{for(const n of names){const k=hdr.indexOf(n);if(k>=0)return k;}return -1;};const iT=ix(["title"]),iV=ix(["venue"]),iVC=ix(["venue code","venue #"]),iW=ix(["website","link"]),iG=ix(["genre"]),iGT=ix(["genre tags"]),iA=ix(["artist"]),iSt=ix(["start time","time start","start"]),iEn=ix(["end time","time end","end"]),iDu=ix(["duration","length"]),iFP=ix(["first performance date","first date","first"]),iLP=ix(["last performance date","last date","last"]),iSub=ix(["subtitle"]),iDesc=ix(["description"]),iAge=ix(["age category","age"]),iCty=ix(["country"]),iPr=ix(["lowest full price","full price","price"]),iPrC=ix(["lowest concession price","concession price"]),iAddr=ix(["venue address"]),iPc=ix(["venue postcode","postcode"]),iLat=ix(["latitude","lat"]),iLng=ix(["longitude","long","lng"]),iWarn=ix(["warnings","warning"]),iAType=ix(["artist type"]),iAcc=ix(["venue accessibility"]),iAccW=ix(["accessibility web"]);parseCatalogCSV.found={start:iSt>=0,end:iEn>=0,duration:iDu>=0};if(iT<0)return[];const out=[];for(let r=hri+1;r<rows.length;r++){const g=j=>j>=0?String(rows[r][j]||"").trim():"";const name=g(iT);if(!name)continue;const genres=[g(iG),g(iGT)].filter(Boolean).join(", ");const start=normCatTime(g(iSt));let end=normCatTime(g(iEn));const duration=normCatDur(g(iDu));if(!end&&start&&duration){const sm=timeToMinutes(start);const dm=(()=>{const m1=duration.match(/^(\d+)h(?:(\d{1,2}))?$/);if(m1)return parseInt(m1[1])*60+(m1[2]?parseInt(m1[2]):0);const m2=duration.match(/^(\d+)m$/);return m2?parseInt(m2[1]):0;})();if(sm!=null&&dm>0){const em=(sm+dm)%1440;end=`${String(Math.floor(em/60)).padStart(2,"0")}:${String(em%60).padStart(2,"0")}`;}}const _addr=g(iAddr),_pc=g(iPc),_fp=g(iPr),_la=parseFloat(g(iLat)),_ln=parseFloat(g(iLng)),_full=[_addr,_pc].filter(Boolean).join(", ");out.push({name,venue:g(iV),venueCode:g(iVC),link:g(iW),genres,genre:g(iG),artist:g(iA),organiser:g(iA)||g(iV)||"Fringe",start,end,duration,firstDate:g(iFP),lastDate:g(iLP),price:(_fp?(/^[\d.]+$/.test(_fp)?("\u00a3"+_fp):_fp):""),priceConc:g(iPrC),address:_full,fullAddress:_full,venuePostcode:_pc,latitude:isNaN(_la)?null:_la,longitude:isNaN(_ln)?null:_ln,lat:isNaN(_la)?null:_la,lng:isNaN(_ln)?null:_ln,age:g(iAge),country:g(iCty),description:g(iDesc),subtitle:g(iSub),warnings:g(iWarn),artistType:g(iAType),accessibility:[g(iAcc),g(iAccW)].filter(Boolean).join(" · "),booked:0,fromCatalog:true});}return out;}
function fringeKeys(){const out=[];try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.indexOf("fringe-")===0)out.push(k);}}catch(e){}return out;}
function migrateData(fromV,toV){/* future key renames go here: read old key, write new, never delete blindly */}
function downloadBackup(){try{const data={};fringeKeys().forEach(k=>{data[k]=localStorage.getItem(k);});const payload={app:"fringe-personal",version:APP_DATA_VERSION,savedAt:new Date().toISOString(),data};const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="fringe-planner-backup-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(url),1500);}catch(e){alert("Backup failed: "+(e&&e.message||e));}}
function restoreBackup(file,onDone){const rd=new FileReader();rd.onload=()=>{try{const obj=JSON.parse(rd.result);const d=obj&&obj.data;if(!d||typeof d!=="object")throw new Error("this doesn't look like a planner backup file");if(!window.confirm("Restore this backup? It replaces the reviews, tags and proposals saved on this device."))return;Object.keys(d).forEach(k=>{if(k.indexOf("fringe-")===0&&typeof d[k]==="string")localStorage.setItem(k,d[k]);});if(obj.version&&obj.version<APP_DATA_VERSION)migrateData(obj.version,APP_DATA_VERSION);localStorage.setItem("fringe-data-version",String(APP_DATA_VERSION));onDone&&onDone();}catch(e){alert("Couldn't restore: "+(e&&e.message||e));}};rd.onerror=()=>alert("Couldn't read that file.");rd.readAsText(file);}
function icsForShows(list){const evs=list.map(s=>{const full=icsForShow(s);const m=full.match(/BEGIN:VEVENT[\s\S]*END:VEVENT/);return m?m[0]:"";}).filter(Boolean);return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//fringe-app//EN","CALSCALE:GREGORIAN",...evs,"END:VCALENDAR"].join("\r\n");}
function downloadShowsICS(list){const blob=new Blob([icsForShows(list)],{type:"text/calendar;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="fringe-bookings.ics";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(url),1500);}
function downloadShowICS(s){const blob=new Blob([icsForShow(s)],{type:"text/calendar;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=(String(s.name)||"show").replace(/[^a-z0-9]+/gi,"-").toLowerCase().replace(/^-|-$/g,"")+".ics";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(url),1500);}
function gcalUrl(s){const start=s.start||"00:00";const{endDate,end}=fEndInfo(s);const q=new URLSearchParams({action:"TEMPLATE",text:s.name+(s.venue?(" | "+s.venue):""),dates:fIcsStamp(s.date,start)+"/"+fIcsStamp(endDate,end),location:s.address||s.venue||"",details:s.link||"",ctz:"Europe/London"});return "https://calendar.google.com/calendar/render?"+q.toString();}
function matchesSearch(show,q){if(!q)return true;const l=q.toLowerCase();return[show.name,show.venue,show.start,show.end,show.attendees,show.organiser,show.address,show.price].filter(Boolean).some(f=>f.toLowerCase().includes(l));}

const UserIcon=()=>(<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" style={{flexShrink:0,opacity:0.7}}><path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5.5 7a5.5 5.5 0 0111 0H2.5z"/></svg>);
const FilterIcon=()=>(<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 1.5A.5.5 0 012 1h12a.5.5 0 01.5.5v2a.5.5 0 01-.128.334L10 8.692V13.5a.5.5 0 01-.342.474l-3 1A.5.5 0 016 14.5V8.692L1.628 3.834A.5.5 0 011.5 3.5v-2z"/></svg>);
const PlusIcon=()=>(<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"/></svg>);
const StarIcon=()=>(<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" style={{flexShrink:0}}><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>);
const XIcon=()=>(<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/></svg>);
const SpinnerIcon=()=>(<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" style={{animation:"spin 1s linear infinite"}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><path d="M8 1a7 7 0 00-7 7h2a5 5 0 015-5V1z" opacity="0.7"/></svg>);

function FringeCalendarInner(){
  const[allShows,setAllShows]=useState(FALLBACK_SHOWS);
  const[wishlist,setWishlist]=useState(FALLBACK_WISHLIST);
  const catAddsRef=useRef({wish:[],book:[]});
  const[bookingShow,setBookingShow]=useState(null);
  const persistCatAdds=useCallback(()=>{try{window.storage.set("fringe-cat-adds",JSON.stringify(catAddsRef.current));}catch{}},[]);
  const catAddWish=useCallback(s=>{const key=reviewKey(s);const already=catAddsRef.current.wish.some(w=>reviewKey(w)===key);if(already){catAddsRef.current.wish=catAddsRef.current.wish.filter(w=>reviewKey(w)!==key);persistCatAdds();setWishlist(w=>w.filter(x=>!(x._catAdd&&reviewKey(x)===key)));}else{const item={...s,booked:0,_catAdd:true,attendees:s.attendees||"Me"};catAddsRef.current.wish=[...catAddsRef.current.wish,item];persistCatAdds();setWishlist(w=>[...w,item]);}},[persistCatAdds]);
  const catConfirmBook=useCallback((s,date,time)=>{const key=reviewKey(s);const item={...s,booked:1,date,start:time||s.start||"",attendees:s.attendees||"Me",_catAdd:true};catAddsRef.current.book=catAddsRef.current.book.filter(w=>reviewKey(w)!==key).concat([item]);persistCatAdds();setAllShows(a=>[...a.filter(x=>!(x._catAdd&&reviewKey(x)===key)),item]);setBookingShow(null);},[persistCatAdds]);
  const[recommendations,setRecommendations]=useState([]);
  const[dataSource,setDataSource]=useState("saved");
  const[lastUpdated,setLastUpdated]=useState(null);
  const[scrolled,setScrolled]=useState(false);
  const[dragY,setDragY]=useState(0);
  const modalRef=useRef(null);
  const mapRef=useRef(null);
  const mapObj=useRef(null);
  const markerLayer=useRef(null);
  const dragStart=useRef(null);
  const[addOpenId,setAddOpenId]=useState(null);
  const[reviews,setReviews]=useState(()=>{try{return JSON.parse(localStorage.getItem("fringe-reviews")||"{}");}catch{return{};}});
  const reviewKey=s=>`${s.name}|${s.date||""}|${s.start||""}`.toLowerCase();
  const setReview=(s,v)=>setReviews(prev=>{const next={...prev,[reviewKey(s)]:v};try{localStorage.setItem("fringe-reviews",JSON.stringify(next));}catch{}return next;});
  const[interests,setInterests]=useState(()=>{try{return JSON.parse(localStorage.getItem("fringe-interests")||"{}");}catch{return{};}});
  const setInterest=(s,v)=>setInterests(prev=>{const next={...prev,[reviewKey(s)]:v};try{localStorage.setItem("fringe-interests",JSON.stringify(next));}catch{}return next;});
  const[tagMap,setTagMap]=useState(()=>{try{return JSON.parse(localStorage.getItem("fringe-tags")||"{}");}catch{return{};}});
  const saveTags=next=>{try{localStorage.setItem("fringe-tags",JSON.stringify(next));}catch{}return next;};
  const addTag=(s,t)=>setTagMap(prev=>{const k=reviewKey(s);const cur=prev[k]||[];if(!t||cur.includes(t))return prev;return saveTags({...prev,[k]:[...cur,t]});});
  const removeTag=(s,t)=>setTagMap(prev=>{const k=reviewKey(s);return saveTags({...prev,[k]:(prev[k]||[]).filter(x=>x!==t)});});
  const [modalTagAdding,setModalTagAdding]=useState(false);
  const [modalTagInput,setModalTagInput]=useState("");
  const[proposals,setProposals]=useState(()=>{try{return JSON.parse(localStorage.getItem("fringe-proposals")||"[]");}catch{return[];}});
  const saveProposals=next=>{try{localStorage.setItem("fringe-proposals",JSON.stringify(next));}catch{}setProposals(next);};
  const shared=useMemo(()=>{const h=typeof window!=="undefined"?window.location.hash:"";const m=h.match(/[#&]p=([^&]+)/);return m?decodeProposals(decodeURIComponent(m[1])):null;},[]);
  const sharedBookings=useMemo(()=>{const h=typeof window!=="undefined"?window.location.hash:"";const m=h.match(/[#&]b=([^&]+)/);return m?decodeBookings(decodeURIComponent(m[1])):null;},[]);
  const sharedJo=useMemo(()=>{const h=typeof window!=="undefined"?window.location.hash:"";const m=h.match(/[#&]j=([^&]+)/);return m?decodeJoPicks(decodeURIComponent(m[1])):null;},[]);
  useEffect(()=>{const on=()=>{const h=window.location.hash.replace(/^#/,"");if(h.startsWith("p="))return;const map={all:"list",picks:"recs",fun:"funfacts",jo:"jospicks"};const v=map[h]||h;if(["calendar","map","list","wishlist","recs","proposal","funfacts","jospicks"].includes(v))setView(v);};window.addEventListener("hashchange",on);return()=>window.removeEventListener("hashchange",on);},[]);
  const dayShowsFor=prop=>{const added=prop.shows||[];const key=s=>`${s.name}|${s.start}`.toLowerCase();const seen=new Set(added.map(key));const booked=allShows.filter(s=>s.booked&&s.date===prop.date&&!seen.has(key(s)));return[...added,...booked];};
  const newProposal=()=>saveProposals([...proposals,{id:"p"+Date.now(),title:"Proposed day",date:"",comment:"",shows:[]}]);
  const updateProposal=(id,patch)=>saveProposals(proposals.map(p=>p.id===id?{...p,...patch}:p));
  const deleteProposal=id=>saveProposals(proposals.filter(p=>p.id!==id));
  const addToProposal=(id,show)=>saveProposals(proposals.map(p=>{if(p.id!==id)return p;const snap={name:show.name,venue:show.venue,start:show.start,end:show.end,price:show.price,address:show.address,organiser:show.organiser,booked:show.booked?1:0,link:show.link,genres:show.genres||"",fullAddress:show.fullAddress||show.address||""};if((p.shows||[]).some(x=>x.name===snap.name&&x.start===snap.start))return p;return{...p,shows:[...(p.shows||[]),snap]};}));
  const removeFromProposal=(id,idx)=>saveProposals(proposals.map(p=>p.id===id?{...p,shows:(p.shows||[]).filter((_,i)=>i!==idx)}:p));
  const shareProposal=prop=>{const token=encodeProposals([{title:prop.title,date:prop.date,comment:prop.comment,shows:dayShowsFor(prop)}]);const url=`${window.location.origin}${window.location.pathname}#p=${token}`;try{navigator.clipboard.writeText(url);}catch{}window.alert("Read-only link copied to clipboard:\n\n"+url);};
  const shareAllProposals=()=>{if(!proposals.length){window.alert("Add a proposed day first.");return;}const token=encodeProposals(proposals.map(p=>({title:p.title,date:p.date,comment:p.comment,shows:dayShowsFor(p)})));const url=`${window.location.origin}${window.location.pathname}#p=${token}`;try{navigator.clipboard.writeText(url);}catch{}window.alert("One link with all "+proposals.length+" option"+(proposals.length!==1?"s":"")+" copied:\n\n"+url);};
  const[view,setView]=useState(()=>{try{const h=window.location.hash.replace(/^#/,"");if(h.startsWith("p="))return "calendar";const map={all:"list",picks:"recs",fun:"funfacts",jo:"jospicks"};const v=map[h]||h;return["calendar","map","list","wishlist","recs","proposal","funfacts","jospicks"].includes(v)?v:"calendar";}catch{return "calendar";}});
  useEffect(()=>{if(shared)return;const slug={list:"all",recs:"picks",funfacts:"fun",jospicks:"jo"}[view]||view;try{window.history.replaceState(null,"","#"+slug);}catch{}},[view,shared]);
  const[selectedShow,setSelectedShow]=useState(null);
  const[statusFilter,setStatusFilter]=useState([]);
  const[orgFilter,setOrgFilter]=useState([]);
  const[genreFilter,setGenreFilter]=useState([]);
  const[openDrop,setOpenDrop]=useState(null);
  const[wishlistSort,setWishlistSort]=useState("name");
  const[wishCols,setWishCols]=useState(1);
  const[weekIdx,setWeekIdx]=useState(0);
  const[customRange,setCustomRange]=useState(null);
  const[bookingsDay,setBookingsDay]=useState("");
  const[propLayout,setPropLayout]=useState(()=>{try{return localStorage.getItem("fringe-proposal-layout")||"vertical";}catch(e){return "vertical";}});
  const[dateOpenId,setDateOpenId]=useState(null);
  const[collapsedProps,setCollapsedProps]=useState({});
  const toggleCollapse=id=>setCollapsedProps(m=>({...m,[id]:!m[id]}));
  const[helpOpen,setHelpOpen]=useState(false);
  const[help,setHelp]=useState(null);
  useEffect(()=>{if(!helpOpen)return;if(Array.isArray(help))return;setHelp("loading");fetch(HELP_URL).then(r=>r.text()).then(t=>{let rows=(Papa.parse(t,{skipEmptyLines:true}).data)||[];if(rows.length&&rows[0].some(cc=>/^(title|section|question|heading|topic|content|answer|body|text|help)$/i.test((cc||"").trim())))rows=rows.slice(1);setHelp(rows);}).catch(()=>setHelp("error"));},[helpOpen]);
  const[datePickerOpen,setDatePickerOpen]=useState(false);
  const[pickStart,setPickStart]=useState("");
  const[pickEnd,setPickEnd]=useState("");
  const[showFilterMenu,setShowFilterMenu]=useState(false);
  const[fabPos,setFabPos]=useState(null);const fabDrag=useRef(null);
  const[updateBanner,setUpdateBanner]=useState(false);
  const[theme,setTheme]=useState(()=>{try{return localStorage.getItem("fringe-theme")||"dark";}catch(e){return "dark";}});
  const[syncOpen,setSyncOpen]=useState(false);
  useEffect(()=>{try{const k="fringe-data-version";const prev=parseInt(localStorage.getItem(k)||"0",10);if(!prev){localStorage.setItem(k,String(APP_DATA_VERSION));}else if(prev<APP_DATA_VERSION){migrateData(prev,APP_DATA_VERSION);localStorage.setItem(k,String(APP_DATA_VERSION));setUpdateBanner(true);}}catch(e){}},[]);
  useEffect(()=>{try{document.documentElement.setAttribute("data-theme",theme);localStorage.setItem("fringe-theme",theme);}catch(e){}},[theme]);
  useEffect(()=>{try{var m=window.location.hash.match(/[#&]sync=([^&]+)/);if(m&&importAllData(m[1])){window.location.replace(window.location.pathname);}}catch(e){}},[]);
  const[shareMode,setShareMode]=useState(false);const[shareSel,setShareSel]=useState(()=>new Set());
  const toggleShareSel=s=>{const k=reviewKey(s);setShareSel(prev=>{const n=new Set(prev);if(n.has(k))n.delete(k);else n.add(k);return n;});};
  const copyBookingsLink=()=>{const sel=allShows.filter(s=>s.booked===1&&shareSel.has(reviewKey(s)));if(!sel.length){window.alert("Tick at least one booked show first.");return;}const token=encodeBookings(sel);const url=`${window.location.origin}${window.location.pathname}#b=${token}`;try{navigator.clipboard.writeText(url);}catch{}window.alert("Share link with "+sel.length+" booking"+(sel.length!==1?"s":"")+" copied — send it to a friend:\n\n"+url);};
  const[allCatalog,setAllCatalog]=useState(null);const[catState,setCatState]=useState("idle");const[catFilterOpen,setCatFilterOpen]=useState(false);const[catGenre,setCatGenre]=useState([]);const[catAge,setCatAge]=useState("");const[catCountry,setCatCountry]=useState("");const[catDur,setCatDur]=useState("");const[catStart,setCatStart]=useState("");const[catPMin,setCatPMin]=useState(0);const[catPMax,setCatPMax]=useState(null);const[catODrop,setCatODrop]=useState(null);const[catVenue,setCatVenue]=useState([]);const[catExp,setCatExp]=useState("");const[catAcc,setCatAcc]=useState(false);const[catDate,setCatDate]=useState("");const[catRunFrom,setCatRunFrom]=useState("");const[catRunTo,setCatRunTo]=useState("");
  const loadCatalog=()=>{if(allCatalog||catState==="loading")return;if(!ALL_CSV_URL){setCatState("unconfigured");return;}setCatState("loading");fetch(ALL_CSV_URL).then(r=>{if(!r.ok)throw 0;return r.text();}).then(t=>{const items=parseCatalogCSV(t);setAllCatalog(items);const f=parseCatalogCSV.found||{};setCatState(items.length?((items.some(s=>s.start))?"ready":(f.start?"ready-empty-times":"ready-no-time-cols")):"error");}).catch(()=>setCatState("error"));};
  useEffect(()=>{if(view==="jospicks")loadCatalog();},[view]);
  const[showFeedback,setShowFeedback]=useState(false);
  const[feedbackText,setFeedbackText]=useState("");
  const[feedbackSent,setFeedbackSent]=useState(false);
  const[landscape,setLandscape]=useState(false);
  const[isMobile,setIsMobile]=useState(false);
  const[joLive,setJoLive]=useState("loading");
  const[sortBy,setSortBy]=useState("time");
  const[timeFilters,setTimeFilters]=useState([]);
  const[peopleFilter,setPeopleFilter]=useState([]);
  const[searchQuery,setSearchQuery]=useState("");
  const[showAddModal,setShowAddModal]=useState(false);
  const[addUrl,setAddUrl]=useState("");
  const[addLoading,setAddLoading]=useState(false);
  const[addError,setAddError]=useState("");
  const gridRef=useRef(null);
  useEffect(()=>{const on=()=>setScrolled(window.scrollY>10);on();window.addEventListener("scroll",on,{passive:true});return()=>window.removeEventListener("scroll",on);},[]);

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("fringe-recommendations");if(r&&r.value)setRecommendations(JSON.parse(r.value));}catch{}})();},[]);
  const saveRecs=useCallback(async(recs)=>{setRecommendations(recs);try{await window.storage.set("fringe-recommendations",JSON.stringify(recs));}catch{}},[]);
  useEffect(()=>{(async()=>{try{const r=await window.storage.get("fringe-cat-adds");if(r&&r.value){const d=JSON.parse(r.value);catAddsRef.current={wish:d.wish||[],book:d.book||[]};if(catAddsRef.current.wish.length)setWishlist(w=>[...w,...catAddsRef.current.wish]);if(catAddsRef.current.book.length)setAllShows(a=>[...a,...catAddsRef.current.book]);}}catch{}})();},[]);
  useEffect(()=>{(async()=>{try{const res=await fetch(SHEET_URL);if(!res.ok)return;const text=await res.text();const{shows,wishlist:wl}=parseCSVToShows(text);if(shows.length>0){setAllShows([...shows,...catAddsRef.current.book]);setWishlist([...wl,...catAddsRef.current.wish]);setDataSource("live");setLastUpdated(new Date());}}catch{}})();},[]);

  const bucketOf=m=>{if(m==null)return null;if(m<120)return "late";if(m<720)return "morning";if(m<1020)return "afternoon";if(m<1320)return "evening";return "late";};
  const inTime=s=>{if(!timeFilters.length)return true;const b=bucketOf(timeToMinutes(s.start));return b!=null&&timeFilters.includes(b);};
  const inPeople=s=>{if(!peopleFilter.length)return true;const att=(s.attendees||"").split(",").map(x=>x.trim());return peopleFilter.some(pp=>att.includes(pp));};
  const inStatus=s=>!statusFilter.length||(statusFilter.includes("booked")&&s.booked===1)||(statusFilter.includes("unbooked")&&s.booked===0);
  const inOrg=s=>!orgFilter.length||orgFilter.includes(s.organiser);
  const inGenre=s=>!genreFilter.length||genresOf(s).some(g=>genreFilter.includes(g));
  const toggleGenre=v=>setGenreFilter(prev=>prev.includes(v)?prev.filter(x=>x!==v):[...prev,v]);
  const availableGenres=useMemo(()=>{const set=new Set();[...allShows,...wishlist,...recommendations].forEach(s=>genresOf(s).forEach(g=>set.add(g)));return[...set].sort();},[allShows,wishlist,recommendations]);
  const toggleStatus=v=>setStatusFilter(prev=>prev.includes(v)?prev.filter(x=>x!==v):[...prev,v]);
  const toggleOrg=v=>setOrgFilter(prev=>prev.includes(v)?prev.filter(x=>x!==v):[...prev,v]);
  const people=useMemo(()=>{const set=new Set();[...allShows,...wishlist].forEach(s=>{(s.attendees||"").split(",").forEach(pp=>{const t=pp.trim();if(t)set.add(t);});});return[...set].sort();},[allShows,wishlist]);
  const toggleTime=b=>setTimeFilters(prev=>prev.includes(b)?prev.filter(x=>x!==b):[...prev,b]);
  const togglePerson=nm=>setPeopleFilter(prev=>prev.includes(nm)?prev.filter(x=>x!==nm):[...prev,nm]);
  const filteredShows=useMemo(()=>allShows.filter(s=>s.date).filter(s=>{if(!inStatus(s))return false;if(!inOrg(s))return false;if(!inTime(s))return false;if(!inPeople(s))return false;if(!inGenre(s))return false;if(searchQuery.trim()&&!matchesSearch(s,searchQuery))return false;return true;}),[allShows,statusFilter,orgFilter,timeFilters,peopleFilter,genreFilter,searchQuery]);
  const weeks=useMemo(()=>getWeeks(filteredShows),[filteredShows]);
  useEffect(()=>{if(weekIdx>=weeks.length)setWeekIdx(Math.max(0,weeks.length-1));},[weeks,weekIdx]);
  const currentMonday=weeks[weekIdx]||"2026-08-03";
  const weekDates=useMemo(()=>{if(customRange&&customRange.start){const s=new Date(customRange.start+"T12:00:00");let e=customRange.end?new Date(customRange.end+"T12:00:00"):s;if(e<s)e=s;let n=Math.round((e-s)/86400000)+1;n=Math.max(1,Math.min(10,n));return Array.from({length:n},(_,i)=>dateToStr(addDays(s,i)));}const m=new Date(currentMonday+"T12:00:00");return Array.from({length:7},(_,i)=>dateToStr(addDays(m,i)));},[customRange,currentMonday]);
  const navPrev=()=>{if(customRange){const n=weekDates.length;setCustomRange({start:dateToStr(addDays(new Date(customRange.start+"T12:00:00"),-n)),end:dateToStr(addDays(new Date(customRange.end+"T12:00:00"),-n))});}else setWeekIdx(Math.max(0,weekIdx-1));};
  const navNext=()=>{if(customRange){const n=weekDates.length;setCustomRange({start:dateToStr(addDays(new Date(customRange.start+"T12:00:00"),n)),end:dateToStr(addDays(new Date(customRange.end+"T12:00:00"),n))});}else setWeekIdx(Math.min(weeks.length-1,weekIdx+1));};
  const applyRange=()=>{if(!pickStart){setDatePickerOpen(false);return;}let s=new Date(pickStart+"T12:00:00");let e=pickEnd?new Date(pickEnd+"T12:00:00"):s;if(e<s){const t=s;s=e;e=t;}const n=Math.round((e-s)/86400000)+1;if(n>10){window.alert("Please choose a range of 10 days or fewer.");return;}setCustomRange({start:dateToStr(s),end:dateToStr(e)});setDatePickerOpen(false);};
  const resetRange=()=>{setCustomRange(null);setDatePickerOpen(false);};
  const showsByDate=useMemo(()=>{const map={};filteredShows.forEach(s=>{if(!map[s.date])map[s.date]=[];map[s.date].push(s);});Object.values(map).forEach(arr=>{if(sortBy==="duration")arr.sort((a,b)=>durationMinutes(a)-durationMinutes(b));else arr.sort((a,b)=>(timeToMinutes(a.start)||0)-(timeToMinutes(b.start)||0));});return map;},[filteredShows,sortBy]);

  const SH=110;const {START_H,END_H}=useMemo(()=>{let minM=Infinity,maxM=-Infinity;const adj=m=>m==null?null:(m<300?m+1440:m);weekDates.forEach(ds=>(showsByDate[ds]||[]).forEach(s=>{const st=adj(timeToMinutes(s.start));if(st==null)return;let en=adj(timeToMinutes(s.end));if(en==null||en<=st)en=st+60;if(st<minM)minM=st;if(en>maxM)maxM=en;}));if(minM===Infinity)return{START_H:10,END_H:20};const sMin=Math.floor((minM-30)/30)*30,eMin=Math.ceil((maxM+30)/30)*30;return{START_H:sMin/60,END_H:Math.max(sMin/60+1,eMin/60)};},[weekDates,showsByDate]);const totalSlots=(END_H-START_H);
  function showTop(s){let m=timeToMinutes(s.start);if(m===null)return 0;if(m<START_H*60)m+=24*60;return((m-START_H*60)/60)*SH;}
  function showHeight(s){let st=timeToMinutes(s.start);let en=timeToMinutes(s.end);if(st===null||en===null)return SH;if(en<=st)en+=24*60;if(st<START_H*60)st+=24*60;return Math.max(((en-st)/60)*SH,SH*0.4);}

  useEffect(()=>{if(view==="calendar"&&gridRef.current){const first=weekDates.reduce((min,date)=>{(showsByDate[date]||[]).forEach(s=>{let m=timeToMinutes(s.start);if(m!==null){if(m<START_H*60)m+=24*60;if(m<min)min=m;}});return min;},Infinity);if(first<Infinity)gridRef.current.scrollTop=Math.max(0,((first-START_H*60)/60)*SH-20);}},[view,weekIdx,currentMonday,showsByDate,customRange]);

  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const todayStr = dateToStr(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const totalSpend=useMemo(()=>allShows.filter(s=>s.booked===1&&s.price).reduce((sum,s)=>{const n=parseFloat(s.price.replace("£","").replace("Free","0"));return sum+(isNaN(n)?0:n*(s.tickets||1));},0),[allShows]);
  const bookedCount=allShows.filter(s=>s.booked===1).length;
  const bookedDays=useMemo(()=>new Set(allShows.filter(s=>s.booked===1&&s.date).map(s=>s.date)).size,[allShows]);
  const organisers=useMemo(()=>[...new Set(allShows.map(s=>s.organiser).filter(Boolean))],[allShows]);
  const organiserChips=useMemo(()=>{const set=new Set(Object.keys(OC));organisers.forEach(o=>set.add(o));return[...set].sort((a,b)=>a.localeCompare(b));},[organisers]);
  const dates=useMemo(()=>[...new Set(filteredShows.map(s=>s.date))].sort(),[filteredShows]);
  const bookingEnd_=s=>{if(!s.date)return null;const sm=timeToMinutes(s.start);let em=timeToMinutes(s.end);if(em==null)em=sm;if(em==null)return null;const d=new Date(s.date+"T00:00:00");if(sm!=null&&em<sm)d.setDate(d.getDate()+1);d.setHours(Math.floor(em/60),em%60,0,0);return d;};
  const bookingsByDate=useMemo(()=>{const map={};filteredShows.forEach(s=>{const e=bookingEnd_(s);if(e&&e<now)return;if(!map[s.date])map[s.date]=[];map[s.date].push(s);});Object.values(map).forEach(arr=>arr.sort((a,b)=>(timeToMinutes(a.start)||0)-(timeToMinutes(b.start)||0)));return map;},[filteredShows,now]);
  const bookingsDates=useMemo(()=>Object.keys(bookingsByDate).sort(),[bookingsByDate]);
  const mapShows=useMemo(()=>statusFilter.length?filteredShows:filteredShows.filter(s=>s.booked===1),[filteredShows,statusFilter]);
  const refreshData=async()=>{try{const res=await fetch(SHEET_URL);if(!res.ok)return;const text=await res.text();const{shows,wishlist:wl}=parseCSVToShows(text);if(shows.length>0){setAllShows([...shows,...catAddsRef.current.book]);setWishlist([...wl,...catAddsRef.current.wish]);setDataSource("live");setLastUpdated(new Date());}}catch{}};
  const filteredWishlist=useMemo(()=>{const base=wishlist.filter(s=>{if(!inStatus(s))return false;if(!inOrg(s))return false;if(!inTime(s))return false;if(!inPeople(s))return false;if(!inGenre(s))return false;if(searchQuery.trim()&&!matchesSearch(s,searchQuery))return false;return true;});const cmp=(a,b)=>{if(wishlistSort==="venue"){const va=(a.venueCode||"").toString().trim(),vb=(b.venueCode||"").toString().trim();if(!va&&!vb)return 0;if(!va)return 1;if(!vb)return -1;const na=parseInt(va)||0,nb=parseInt(vb)||0;if(na!==nb)return na-nb;return va.localeCompare(vb);}if(wishlistSort==="location"){const la=(a.fullAddress||a.address||a.venue||"").trim(),lb=(b.fullAddress||b.address||b.venue||"").trim();if(!la&&!lb)return 0;if(!la)return 1;if(!lb)return -1;return la.localeCompare(lb);}if(wishlistSort==="duration")return durationMinutes(a)-durationMinutes(b);return String(a.name||"").localeCompare(String(b.name||""));};return[...base].sort(cmp);},[wishlist,statusFilter,orgFilter,timeFilters,peopleFilter,genreFilter,searchQuery,wishlistSort]);
  const filteredRecs=useMemo(()=>{let r=recommendations;r=r.filter(inOrg).filter(inTime).filter(inPeople).filter(inGenre);if(searchQuery.trim())r=r.filter(x=>matchesSearch(x,searchQuery));return r;},[recommendations,orgFilter,searchQuery,timeFilters,peopleFilter,genreFilter]);
  const funFacts=useMemo(()=>{const filterOn=peopleFilter.length>0;const booked=allShows.filter(s=>s.booked===1&&inPeople(s));const now=new Date();const mode=arr=>{const m={};let best=null,bc=0;arr.forEach(x=>{if(!x)return;m[x]=(m[x]||0)+1;if(m[x]>bc){bc=m[x];best=x;}});return{value:best,count:bc};};const days=new Set(booked.map(s=>s.date).filter(Boolean));const attended=booked.filter(s=>{if(!s.date)return false;return new Date(s.date+"T23:59:59")<=now;});const org=mode(booked.map(s=>s.organiser));const dayCount={};booked.forEach(s=>{if(s.date)dayCount[s.date]=(dayCount[s.date]||0)+1;});let topDay=null,topDayN=0;Object.keys(dayCount).forEach(d=>{if(dayCount[d]>topDayN){topDayN=dayCount[d];topDay=d;}});const attNames=[];booked.forEach(s=>(s.attendees||"").split(",").forEach(pp=>{const t=pp.trim();if(!t)return;if(t.toLowerCase()==="me"){if(filterOn)attNames.push("Jo");}else attNames.push(t);}));const topMate=(()=>{const m={};let bc=0;attNames.forEach(x=>{m[x]=(m[x]||0)+1;if(m[x]>bc)bc=m[x];});const vals=Object.keys(m).filter(k=>m[k]===bc);return{values:bc?vals.sort():[],count:bc};})();const favs=booked.filter(s=>reviews[reviewKey(s)]===5);const hated=booked.filter(s=>reviews[reviewKey(s)]===1);const buckets={morning:0,afternoon:0,evening:0,late:0};booked.forEach(s=>{const m=timeToMinutes(s.start);if(m==null)return;const b=m<120?"late":m<720?"morning":m<1020?"afternoon":m<1320?"evening":"late";buckets[b]++;});let topBucket=null,tbN=0;Object.keys(buckets).forEach(b=>{if(buckets[b]>tbN){tbN=buckets[b];topBucket=b;}});const mostExp=booked.filter(s=>s.price&&poundsOf(s.price)>0).reduce((a,s)=>(!a||poundsOf(s.price)>poundsOf(a.price))?s:a,null);const cheapest=booked.filter(s=>s.price).reduce((a,s)=>(!a||poundsOf(s.price)<poundsOf(a.price))?s:a,null);const STOP=new Set("the a an and of to at in on for with from live show tour presents my your me is it de la".split(" "));const words={};booked.forEach(s=>String(s.name||"").toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).forEach(w=>{if(w.length>2&&!STOP.has(w))words[w]=(words[w]||0)+1;}));let topWord=null,twN=0;Object.keys(words).forEach(w=>{if(words[w]>twN){twN=words[w];topWord=w;}});const byDate={};booked.forEach(s=>{if(s.date)(byDate[s.date]=byDate[s.date]||[]).push(s);});let tightest=null;Object.keys(byDate).forEach(d=>{const arr=byDate[d].slice().sort((a,b)=>(timeToMinutes(a.start)||0)-(timeToMinutes(b.start)||0));for(let i=0;i<arr.length-1;i++){const pe=timeToMinutes(arr[i].end);const ns=timeToMinutes(arr[i+1].start);if(pe==null||ns==null)continue;const gap=ns-pe;if(gap>=0&&(tightest==null||gap<tightest))tightest=gap;}});const venueCount={},venueInfo={};booked.forEach(s=>{const k=(s.venueCode||s.venue||"").toString();if(!k)return;venueCount[k]=(venueCount[k]||0)+1;if(!venueInfo[k])venueInfo[k]={code:s.venueCode||"",name:s.venue||""};});let tvKey=null,tvN=0;Object.keys(venueCount).forEach(k=>{if(venueCount[k]>tvN){tvN=venueCount[k];tvKey=k;}});const topVenue=tvKey?{code:venueInfo[tvKey].code,name:venueInfo[tvKey].name,count:tvN}:null;const adj=m=>m==null?null:(m<300?m+1440:m);let earliest=null,latest=null;booked.forEach(s=>{const a=adj(timeToMinutes(s.start));if(a==null)return;if(earliest==null||a<adj(timeToMinutes(earliest.start)))earliest=s;if(latest==null||a>adj(timeToMinutes(latest.start)))latest=s;});let longest=null;booked.forEach(s=>{const dd=durationMinutes(s);if(dd>0&&(longest==null||dd>durationMinutes(longest)))longest=s;});const totalMin=booked.reduce((a,s)=>a+durationMinutes(s),0);return{booked:booked.length,days:days.size,attended:attended.length,org,topDay,topDayN,topMate,favs,hated,topBucket,mostExp,cheapest,topWord,tightest,topVenue,earliest,latest,longest,totalMin};},[allShows,reviews,peopleFilter]);
  const[joLanes,setJoLanes]=useState(()=>{try{return JSON.parse(localStorage.getItem("fringe-jopicks")||"{}");}catch{return{};}});
  const setJoLane=(k,lane)=>setJoLanes(prev=>{const next={...prev,[k]:lane};try{localStorage.setItem("fringe-jopicks",JSON.stringify(next));}catch{}return next;});
  const[joDragKey,setJoDragKey]=useState(null);
  const[joLaneFilter,setJoLaneFilter]=useState([]);
  const[joPMin,setJoPMin]=useState(0);
  const[joPMax,setJoPMax]=useState(null);
  const toggleJoLane=v=>setJoLaneFilter(prev=>prev.includes(v)?prev.filter(x=>x!==v):[...prev,v]);
  const joItems=useMemo(()=>{const seen=new Set();const out=[];[...allShows,...wishlist].forEach(s=>{const k=reviewKey(s);if(seen.has(k))return;seen.add(k);out.push(s);});return out;},[allShows,wishlist]);
  const catOf=s=>(joLanes[reviewKey(s)]||s.joCat||"").trim();
  const joCats=useMemo(()=>{const seen=new Set(),out=[];joItems.forEach(s=>{const cc=(s.joCat||"").trim();if(cc&&!seen.has(cc)){seen.add(cc);out.push(cc);}});joItems.forEach(s=>{const cc=catOf(s);if(cc&&!seen.has(cc)){seen.add(cc);out.push(cc);}});return out;},[joItems,joLanes]);
  const joByLane=useMemo(()=>{const map={};joItems.forEach(s=>{const cc=catOf(s)||"Uncategorised";(map[cc]=map[cc]||[]).push(s);});Object.keys(map).forEach(k=>map[k].sort(joSort));return map;},[joItems,joLanes]);
  const joPriceMax=useMemo(()=>{let m=0;joItems.forEach(s=>{const p=poundsOf(s.price);if(p>m)m=p;});return Math.max(5,Math.ceil(m));},[joItems]);
  const joCards=useMemo(()=>joItems.filter(s=>{if(!inOrg(s))return false;if(!inGenre(s))return false;if(!inTime(s))return false;if(searchQuery.trim()&&!matchesSearch(s,searchQuery))return false;if(joLaneFilter.length&&!joLaneFilter.includes(catOf(s)))return false;const p=poundsOf(s.price);if(p<joPMin)return false;if(joPMax!=null&&p>joPMax)return false;return true;}).slice().sort((a,b)=>String(a.name||"").localeCompare(String(b.name||""))),[joItems,joLanes,joLaneFilter,joPMin,joPMax,orgFilter,genreFilter,timeFilters,searchQuery]);
  const fData=view==="wishlist"?wishlist:view==="recs"?recommendations:view==="jospicks"?(allCatalog||[]):allShows;
  const catGenreOpts=useMemo(()=>{const s=new Set();(allCatalog||[]).forEach(x=>genresOf(x).forEach(g=>g&&s.add(g)));return [...s].sort();},[allCatalog]);
  const catAgeOpts=useMemo(()=>{const s=new Set();(allCatalog||[]).forEach(x=>x.age&&s.add(x.age));return [...s].sort();},[allCatalog]);
  const catCountryOpts=useMemo(()=>{const s=new Set();(allCatalog||[]).forEach(x=>x.country&&s.add(x.country));return [...s].sort();},[allCatalog]);
  const catPriceMax=useMemo(()=>{let m=0;(allCatalog||[]).forEach(x=>{const pp=poundsOf(x.price);if(pp>m)m=pp;});return Math.max(5,Math.ceil(m));},[allCatalog]);
  const catVenueOpts=useMemo(()=>{const m={};(allCatalog||[]).forEach(x=>{if(x.venue){const k=(x.venueCode||x.venue);m[k]={value:k,label:(x.venueCode?"#"+x.venueCode+" — ":"")+x.venue+(x.venuePostcode?", "+x.venuePostcode:"")};}});return Object.values(m).sort((a,b)=>a.label.localeCompare(b.label));},[allCatalog]);
  const catExpOpts=useMemo(()=>{const s=new Set();(allCatalog||[]).forEach(x=>x.artistType&&s.add(x.artistType));return [...s].sort();},[allCatalog]);
  const toggleCatVenue=v=>setCatVenue(a=>a.includes(v)?a.filter(x=>x!==v):[...a,v]);
  const catFiltersActive=catGenre.length||catAge||catCountry||catStart||catDur||catPMin>0||catPMax!=null||catVenue.length||catExp||catAcc||catDate||catRunFrom||catRunTo;
  const toggleCatGenre=g=>setCatGenre(a=>a.includes(g)?a.filter(x=>x!==g):[...a,g]);
  const catSelStyle={width:"100%",boxSizing:"border-box",padding:"10px 12px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,outline:"none",colorScheme:"dark"};
  const catFiltered=useMemo(()=>{const q=searchQuery.trim();return (allCatalog||[]).filter(s=>{if(q&&!matchesSearch(s,q))return false;if(catGenre.length&&!genresOf(s).some(g=>catGenre.includes(g)))return false;if(catAge&&s.age!==catAge)return false;if(catCountry&&s.country!==catCountry)return false;if(catStart){const b=bucketOf(timeToMinutes(s.start));if(b!==catStart)return false;}if(catDur){const d=durationMinutes(s);if(catDur==="short"&&d>60)return false;if(catDur==="med"&&(d<=60||d>120))return false;if(catDur==="long"&&d<=120)return false;}const pp=poundsOf(s.price);if(pp<catPMin)return false;if(catPMax!=null&&pp>catPMax)return false;if(catVenue.length&&!catVenue.includes(s.venueCode||s.venue))return false;if(catExp&&s.artistType!==catExp)return false;if(catAcc&&!s.accessibility)return false;if(catDate){if(s.firstDate&&s.lastDate){if(catDate<s.firstDate||catDate>s.lastDate)return false;}else if(s.firstDate){if(s.firstDate!==catDate)return false;}}if(catRunFrom&&s.lastDate&&s.lastDate<catRunFrom)return false;if(catRunTo&&s.firstDate&&s.firstDate>catRunTo)return false;return true;});},[allCatalog,searchQuery,catGenre,catAge,catCountry,catStart,catDur,catPMin,catPMax,catVenue,catExp,catAcc,catDate,catRunFrom,catRunTo]);
  const fHas={org:fData.some(s=>s&&s.organiser),genre:fData.some(s=>genresOf(s).length>0),people:fData.some(s=>((s&&s.attendees)||"").trim()),time:fData.some(s=>timeToMinutes(s&&s.start)!=null)};
  const joLiveRoute=typeof window!=="undefined"&&/[#&]jolive/.test(window.location.hash);
  const saveJoToSheet=()=>{const picks=[];Object.keys(joByLane).forEach(lane=>{if(lane==="all")return;joByLane[lane].forEach(s=>picks.push({lane,name:s.name,venue:s.venue,start:s.start,end:s.end,price:s.price,link:s.link||"",date:s.date||""}));});if(APPS_SCRIPT_URL){try{fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"jopicks",picks})});}catch{}}window.alert(JOPICKS_CSV_URL?("Saved! Your live, always-current link is:\n\n"+window.location.origin+window.location.pathname+"#jolive"):"Saved to the JoPicks tab of your sheet. To turn on the shareable live link, publish that tab as a CSV and add its URL (see the build notes).");};
  const submitFeedback=()=>{const t=feedbackText.trim();if(!t)return;if(APPS_SCRIPT_URL){try{fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"feedback",text:t})});}catch{}}setFeedbackSent(true);setFeedbackText("");};
  useEffect(()=>{if(typeof window==="undefined")return;const upd=()=>{try{setLandscape(window.matchMedia?window.matchMedia("(orientation: landscape)").matches:window.innerWidth>window.innerHeight);}catch{setLandscape(window.innerWidth>window.innerHeight);}setIsMobile(window.innerWidth<=640);};upd();window.addEventListener("resize",upd);window.addEventListener("orientationchange",upd);return()=>{window.removeEventListener("resize",upd);window.removeEventListener("orientationchange",upd);};},[]);
  useEffect(()=>{if(!joLiveRoute)return;if(!JOPICKS_CSV_URL){setJoLive(null);return;}(async()=>{try{const res=await fetch(JOPICKS_CSV_URL);if(!res.ok){setJoLive(null);return;}const text=await res.text();setJoLive(parseJoCsv(text));}catch{setJoLive(null);}})();},[]);
  useEffect(()=>{if(view!=="map")return;let cancelled=false;loadLeaflet().then(L=>{if(cancelled||!mapRef.current)return;if(mapObj.current&&mapObj.current.getContainer()!==mapRef.current){try{mapObj.current.remove();}catch(e){}mapObj.current=null;}if(!mapObj.current){mapObj.current=L.map(mapRef.current,{scrollWheelZoom:true}).setView([55.9505,-3.19],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap"}).addTo(mapObj.current);markerLayer.current=L.layerGroup().addTo(mapObj.current);}markerLayer.current.clearLayers();const byV={};mapShows.forEach(s=>{const code=(s.venueCode||"").toString().trim();if(!code)return;const co=VENUE_GEO[code];if(!co)return;(byV[code]=byV[code]||{lat:co[0],lng:co[1],name:co[2]||s.venue||("Venue "+code),shows:[]}).shows.push(s);});const esc=t=>String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const pts=[];Object.keys(byV).forEach(k=>{const v=byV[k];const m=L.circleMarker([v.lat,v.lng],{radius:9,color:"#fff",weight:1.5,fillColor:"#A855F7",fillOpacity:0.9}).addTo(markerLayer.current);const list=v.shows.slice(0,10).map(s=>"\u2022 "+esc(s.name)+(s.date?" ("+s.date+")":"")).join("<br>");m.bindPopup("<b>"+esc(v.name)+"</b><br>"+list);pts.push([v.lat,v.lng]);});if(pts.length)mapObj.current.fitBounds(pts,{padding:[35,35],maxZoom:15});setTimeout(()=>{try{mapObj.current&&mapObj.current.invalidateSize();}catch(e){}},150);}).catch(()=>{});return ()=>{cancelled=true;};},[view,mapShows]);
  const shareJoPicks=()=>{const token=encodeJoPicks(joByLane);const url=`${window.location.origin}${window.location.pathname}#j=${token}`;try{navigator.clipboard.writeText(url);}catch{}window.alert("Read-only link to your Jo's picks copied:\n\n"+url);};

  const handleAddShow=async()=>{
    if(!addUrl.trim())return;const url=addUrl.trim();
    try{const h=new URL(url).hostname.replace("www.","");if(!ALLOWED_DOMAINS.some(d=>h===d||h.endsWith("."+d))){setAddError("Use a link from edfest.com, edfringe.com, or a venue site.");return;}}catch{setAddError("That doesn't look like a valid URL.");return;}
    setAddLoading(true);setAddError("");
    try{
      // Use Claude with web search to look up the show — avoids CORS issues
      const aiRes=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Look up this Edinburgh Fringe show page and extract the details: ${url}

Also search edfringe.com for this show to get the most accurate data.

Return ONLY valid JSON with no markdown backticks, no explanation.
{"name":"Show Name","organiser":"Venue Company e.g. Pleasance/Assembly/Gilded Balloon/Underbelly/Just The Tonic/Monkey Barrel/The Stand","venue":"Specific venue name","start":"HH:MM","end":"HH:MM","price":"£X","duration":"1h","address":"Full address with postcode if available","description":"One sentence summary of the show"}
Use empty string "" for any field you cannot find.`}]})});
      if(!aiRes.ok)throw new Error("Couldn't look up show details");
      const aiData=await aiRes.json();
      const aiText=(aiData.content||[]).map(c=>c.text||"").filter(Boolean).join("").replace(/```json|```/g,"").trim();
      // Find the JSON object in the response
      const jsonMatch=aiText.match(/\{[\s\S]*\}/);
      if(!jsonMatch)throw new Error("Couldn't extract show details");
      const parsed=JSON.parse(jsonMatch[0]);
      const newRec={id:Date.now(),name:parsed.name||"Unknown Show",organiser:parsed.organiser||"",venue:parsed.venue||"",start:parsed.start||"",end:parsed.end||"",price:parsed.price||"",duration:parsed.duration||"",address:parsed.address||"",description:parsed.description||"",link:url,isRecommendation:true};
      await saveRecs([...recommendations,newRec]);
      if(APPS_SCRIPT_URL){try{await fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:newRec.name,organiser:newRec.organiser,venue:newRec.venue,start:newRec.start,end:newRec.end,price:newRec.price,duration:newRec.duration,address:newRec.address,description:newRec.description,link:newRec.link})});}catch{}}
      setAddUrl("");setShowAddModal(false);
    }catch(e){setAddError(e.message||"Something went wrong.");}finally{setAddLoading(false);}
  };
  const removeRec=async(id)=>{await saveRecs(recommendations.filter(r=>r.id!==id));};

  const gc=(org)=>OC[org]||{bg:"#64748B",glow:"rgba(100,116,139,0.3)"};

  const setLayout=v=>{setPropLayout(v);try{localStorage.setItem("fringe-proposal-layout",v);}catch(e){}};
  const layoutToggle=(<div style={{display:"inline-flex",borderRadius:8,border:`1px solid ${CARD_BORDER}`,overflow:"hidden",flexShrink:0}}><button title="Stack vertically" onClick={()=>setLayout("vertical")} style={{padding:"5px 8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",background:propLayout==="vertical"?ACCENT:"transparent",color:propLayout==="vertical"?"#fff":TXT2}}><RowsIcon/></button><button title="Side by side" onClick={()=>setLayout("horizontal")} style={{padding:"5px 8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",background:propLayout==="horizontal"?ACCENT:"transparent",color:propLayout==="horizontal"?"#fff":TXT2}}><ColsIcon/></button></div>);
  if(shared&&shared.length){const multi=shared.length>1;return(
    <div style={{fontFamily:"'Inter',system-ui,-apple-system,sans-serif",maxWidth:multi&&propLayout==="horizontal"?1360:640,margin:"0 auto",color:TXT,padding:"0 4px 40px",background:BG,minHeight:"100vh"}}>
      <div style={{position:"relative",textAlign:"center",padding:"24px 16px 16px",borderBottom:`1px solid ${CARD_BORDER}`,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:TXT2}}>Edinburgh Fringe</div>
        <h1 style={{fontSize:24,fontWeight:900,margin:"6px 0 0",color:TXT}}>{multi?(shared.length+" options for you"):(shared[0].title||"Proposed day")}</h1>
        <div style={{fontSize:12,color:TXT3,marginTop:4}}>Shared plan · read-only{multi?" · pick your favourite":""}</div>
        {multi&&<div style={{marginTop:12}}>{layoutToggle}</div>}
      </div>
      <div style={multi&&propLayout==="horizontal"?{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:16,alignItems:"start",padding:"0 20px"}:{}}>
      {shared.map((prop,i)=>(
        <div key={i} style={{padding:propLayout==="horizontal"&&multi?0:"0 12px",marginBottom:propLayout==="horizontal"&&multi?0:(multi?30:0)}}>
          {multi&&<h2 style={{fontSize:18,fontWeight:800,color:TXT,margin:"8px 4px 6px"}}>{prop.title||("Option "+(i+1))}{prop.date?<span style={{fontSize:13,fontWeight:600,color:TXT3}}>{"  "+(()=>{const d=new Date(prop.date+"T12:00:00");return isNaN(d.getTime())?"":`${DAYS_FULL[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;})()}</span>:null}</h2>}
          {prop.comment&&<div style={{fontSize:14,color:TXT2,lineHeight:1.5,background:"rgba(168,85,247,0.1)",border:"1px solid rgba(168,85,247,0.25)",borderRadius:12,padding:"10px 14px",margin:"4px 4px 12px"}}>💬 {prop.comment}</div>}
          <ErrorBoundary><ProposalDay date={prop.date} shows={prop.shows||[]}/></ErrorBoundary>
        </div>
      ))}
      </div>
    </div>
  );}
  if(sharedJo){return(
    <div style={{fontFamily:"'Inter',system-ui,-apple-system,sans-serif",maxWidth:760,margin:"0 auto",color:TXT,padding:"0 8px 50px",background:BG,minHeight:"100vh"}}>
      <div style={{position:"relative",textAlign:"center",padding:"24px 16px 16px",borderBottom:`1px solid ${CARD_BORDER}`,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:TXT2}}>Edinburgh Fringe</div>
        <h1 style={{fontSize:24,fontWeight:900,margin:"6px 0 0",color:TXT}}>Jo's picks</h1>
        <div style={{fontSize:12,color:TXT3,marginTop:4}}>Shared list · read-only</div>
      </div>
      {Object.keys(sharedJo).filter(k=>(sharedJo[k]||[]).length>0).map(k=>(
        <div key={k} style={{marginBottom:20}}>
          <div style={{fontSize:15,fontWeight:800,color:TXT,padding:"0 6px 8px"}}>{k} <span style={{color:TXT3,fontWeight:600,fontSize:13}}>({(sharedJo[k]||[]).length})</span></div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {(sharedJo[k]||[]).slice().sort(joSort).map((s,i)=>(<JoCard key={i} show={s} readOnly/>))}
          </div>
        </div>
      ))}
    </div>
  );}
  if(sharedBookings&&sharedBookings.length){const byD={};sharedBookings.forEach(s=>{(byD[s.date||"zzz"]=byD[s.date||"zzz"]||[]).push(s);});const dts=Object.keys(byD).sort();const fmtD=d=>{if(d==="zzz")return "Date TBC";const x=new Date(d+"T12:00:00");return isNaN(x.getTime())?d:`${DAYS_FULL[x.getDay()]} ${x.getDate()} ${MONTHS[x.getMonth()]}`;};const withDates=sharedBookings.filter(s=>s.date);return(
    <div style={{fontFamily:"'Inter',system-ui,-apple-system,sans-serif",maxWidth:640,margin:"0 auto",color:TXT,padding:"0 8px 50px",background:BG,minHeight:"100vh"}}>
      <div style={{position:"relative",textAlign:"center",padding:"24px 16px 16px",borderBottom:`1px solid ${CARD_BORDER}`,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:TXT2}}>Edinburgh Fringe</div>
        <h1 style={{fontSize:24,fontWeight:900,margin:"6px 0 0",color:TXT}}>Booked shows 🎫</h1>
        <div style={{fontSize:12,color:TXT3,marginTop:4}}>{sharedBookings.length} booking{sharedBookings.length!==1?"s":""} shared with you · read-only</div>
        {withDates.length>0&&<button onClick={()=>downloadShowsICS(withDates)} style={{marginTop:12,padding:"10px 18px",borderRadius:12,border:"none",background:ACCENT,color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer"}}>📅 Download all calendar entries (.ics)</button>}
      </div>
      {dts.map(d=>(
        <div key={d} style={{marginBottom:22,padding:"0 6px"}}>
          <div style={{fontSize:16,fontWeight:900,color:TXT,margin:"0 4px 10px"}}>{fmtD(d)}</div>
          {byD[d].sort((a,b)=>(timeToMinutes(a.start)||0)-(timeToMinutes(b.start)||0)).map((s,i)=>(
            <div key={i} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:16,padding:"14px 16px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"flex-start",flexWrap:"wrap"}}>
                <div style={{minWidth:0}}>
                  {s.organiser&&<div style={{display:"inline-block",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:7,marginBottom:6,background:gc(s.organiser).bg,color:"#fff"}}>{s.organiser}</div>}
                  <div style={{fontSize:16,fontWeight:800,color:TXT,lineHeight:1.25}}>{s.name}</div>
                  <div style={{fontSize:13,color:TXT2,marginTop:3}}>{s.venue}</div>
                  <div style={{fontSize:13,color:TXT2,marginTop:5}}>🕐 {s.start?formatTime(s.start):"TBC"}{s.end?` – ${formatTime(s.end)}`:""}{s.duration?` · ${s.duration}`:""}{s.price?` · ${s.price}`:""}</div>
                  {(s.fullAddress||s.address)&&<div style={{fontSize:12,color:TXT3,marginTop:3}}>📍 {s.fullAddress||s.address}</div>}
                </div>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  {s.link&&<a href={s.link} target="_blank" rel="noopener noreferrer" aria-label={"View "+s.name+" listing (opens in a new tab)"} style={{padding:"8px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,color:TXT2,fontSize:12,fontWeight:700,textDecoration:"none"}}>Listing ↗</a>}
                  {s.date&&<button onClick={()=>downloadShowICS(s)} style={{padding:"8px 12px",borderRadius:10,border:"none",background:"rgba(52,211,153,0.2)",color:"#34D399",fontSize:12,fontWeight:800,cursor:"pointer"}}>📅 Calendar</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );}
  if(joLiveRoute){return(
    <div style={{fontFamily:"'Inter',system-ui,-apple-system,sans-serif",maxWidth:760,margin:"0 auto",color:TXT,padding:"0 8px 50px",background:BG,minHeight:"100vh"}}>
      <div style={{position:"relative",textAlign:"center",padding:"24px 16px 16px",borderBottom:`1px solid ${CARD_BORDER}`,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:TXT2}}>Edinburgh Fringe</div>
        <h1 style={{fontSize:24,fontWeight:900,margin:"6px 0 0",color:TXT}}>Jo's picks</h1>
        <div style={{fontSize:12,color:TXT3,marginTop:4}}>Live · read-only</div>
      </div>
      {joLive==="loading"&&<div style={{textAlign:"center",color:TXT3,fontSize:14,padding:"30px 10px"}}>Loading Jo's latest picks…</div>}
      {joLive===null&&<div style={{textAlign:"center",color:TXT3,fontSize:14,padding:"30px 16px",lineHeight:1.5}}>This live link isn't switched on yet.</div>}
      {joLive&&typeof joLive==="object"&&Object.keys(joLive).filter(k=>(joLive[k]||[]).length>0).map(k=>(
        <div key={k} style={{marginBottom:20}}>
          <div style={{fontSize:15,fontWeight:800,color:TXT,padding:"0 6px 8px"}}>{k} <span style={{color:TXT3,fontWeight:600,fontSize:13}}>({(joLive[k]||[]).length})</span></div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {(joLive[k]||[]).slice().sort(joSort).map((s,i)=>(<JoCard key={i} show={s} readOnly/>))}
          </div>
        </div>
      ))}
    </div>
  );}
  return(
    <div style={{fontFamily:"'Inter',system-ui,-apple-system,sans-serif",maxWidth:960,margin:"0 auto",color:TXT,padding:isMobile?"0 4px 88px":"0 4px",background:BG,minHeight:"100vh"}}>
      <style>{":root,[data-theme=dark]{--bg:#0B0B1A;--card:rgba(255,255,255,0.06);--card-border:rgba(255,255,255,0.1);--txt:#F1F0F7;--txt2:rgba(241,240,247,0.5);--txt3:rgba(241,240,247,0.3);--card-solid:#151528}[data-theme=light]{--bg:#F4F4F8;--card:rgba(0,0,0,0.045);--card-border:rgba(0,0,0,0.14);--txt:#1A1A2E;--txt2:rgba(26,26,46,0.62);--txt3:rgba(26,26,46,0.42);--card-solid:#FFFFFF}select,option{color:var(--txt)}option{background:var(--card-solid);color:var(--txt)}"}</style>
      {updateBanner&&<div role="status" style={{background:"rgba(168,85,247,0.14)",border:`1px solid #a855f7`,borderRadius:12,padding:"10px 14px",margin:"10px 8px 0",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",fontSize:13}}>
        <span style={{color:TXT,flex:"1 1 220px"}}>✨ The planner's been updated — your reviews, tags and proposals are safe. Grab a backup just in case.</span>
        <button onClick={downloadBackup} style={{padding:"7px 13px",borderRadius:9,border:"none",background:ACCENT,color:"#fff",fontWeight:800,cursor:"pointer",fontSize:12}}>⬇ Download backup</button>
        <button onClick={()=>setUpdateBanner(false)} style={{padding:"7px 11px",borderRadius:9,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontWeight:700,cursor:"pointer",fontSize:12}}>Dismiss</button>
      </div>}

      {/* HEADER */}
      <div style={{position:"sticky",top:0,zIndex:50,background:BG}}>
        {isMobile?(
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderBottom:`1px solid ${CARD_BORDER}`,background:BG}}>
            <div onClick={refreshData} title="Tap to refresh" style={{fontSize:10,fontWeight:700,color:dataSource==="live"?"#34D399":TXT3,display:"flex",alignItems:"center",gap:4,minWidth:46}}><span style={{width:6,height:6,borderRadius:3,background:dataSource==="live"?"#34D399":"#FB923C",display:"inline-block"}}/>{dataSource==="live"?"Live":"Saved"}</div>
            <span style={{fontSize:18,fontWeight:900,background:ACCENT,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Edinburgh Fringe</span>
            <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}><ThemeToggle theme={theme} set={setTheme}/><button onClick={()=>setSyncOpen(true)} aria-label="Copy my data to another device" title="Copy my data to another device" style={{width:34,height:32,display:"inline-flex",alignItems:"center",justifyContent:"center",borderRadius:8,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:15,cursor:"pointer"}}>⧉</button></div>
          </div>
        ):scrolled?(
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 14px",borderBottom:`1px solid ${CARD_BORDER}`,background:BG}}>
            <span style={{fontSize:16,fontWeight:800,background:ACCENT,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Edinburgh Fringe</span>
            {view!=="proposal"&&view!=="jospicks"&&view!=="list"&&view!=="wishlist"&&view!=="funfacts"&&view!=="calendar"&&<button onClick={()=>setShowFilterMenu(!showFilterMenu)} style={{padding:"6px 14px",borderRadius:20,border:"none",fontSize:13,fontWeight:700,cursor:"pointer",background:showFilterMenu?TXT:"rgba(255,255,255,0.85)",color:BG,display:"flex",alignItems:"center",gap:6}}><FilterIcon/> Filter view {showFilterMenu?"▲":"▼"}</button>}
          </div>
        ):(
          <>
            <div style={{position:"relative",textAlign:"center",padding:"28px 16px 20px",background:`linear-gradient(180deg, rgba(168,85,247,0.15) 0%, transparent 100%)`,borderBottom:`1px solid ${CARD_BORDER}`}}>
              <div style={{position:"absolute",top:10,left:12,display:"flex",gap:6,alignItems:"center"}}><ThemeToggle theme={theme} set={setTheme}/><button onClick={()=>setSyncOpen(true)} aria-label="Copy my data to another device" title="Copy my data to another device" style={{width:34,height:32,display:"inline-flex",alignItems:"center",justifyContent:"center",borderRadius:8,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:15,cursor:"pointer"}}>⧉</button></div>
              <div onClick={refreshData} title="Tap to refresh" style={{position:"absolute",top:10,right:12,fontSize:11,fontWeight:700,color:dataSource==="live"?"#34D399":TXT3,cursor:"pointer",display:"flex",alignItems:"center",gap:5,letterSpacing:"0.3px"}}>
                <span style={{width:7,height:7,borderRadius:4,background:dataSource==="live"?"#34D399":"#FB923C",display:"inline-block"}}/>
                {dataSource==="live"?"Live":"Saved"}{lastUpdated?` · ${lastUpdated.getDate()} ${MONTHS[lastUpdated.getMonth()]} ${pad2(lastUpdated.getHours())}:${pad2(lastUpdated.getMinutes())}`:""}
              </div>
              <div style={{fontSize:13,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:TXT2,marginBottom:8}}>Edinburgh</div>
              <h1 style={{fontSize:40,fontWeight:900,letterSpacing:"-1px",margin:0,background:ACCENT,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.1}}>FRINGE 2026</h1>
              <div style={{display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap",alignItems:"center",marginTop:14}}>
                {isMobile?(
                  <select value={view} onChange={e=>setView(e.target.value)} style={{padding:"9px 16px",borderRadius:20,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.12)",color:TXT,fontSize:14,fontWeight:700,cursor:"pointer",outline:"none",colorScheme:"dark"}}>
                    <option value="calendar">Calendar</option>
                    <option value="map">Map</option>
                    <option value="list">Bookings</option>
                    <option value="wishlist">Wishlist</option>
                    <option value="jospicks">Browse catalogue</option>
                    <option value="proposal">Proposal</option>
                    <option value="funfacts">Stats</option>
                  </select>
                ):(<>
                  <TabBtn active={view==="calendar"} onClick={()=>setView("calendar")}>Calendar</TabBtn>
                  <TabBtn active={view==="map"} onClick={()=>setView("map")}>Map</TabBtn>
                  <TabBtn active={view==="list"} onClick={()=>setView("list")}>Bookings</TabBtn>
                  <TabBtn active={view==="wishlist"} onClick={()=>setView("wishlist")}>Wishlist</TabBtn>
                  <TabBtn active={view==="jospicks"} onClick={()=>{setView("jospicks");loadCatalog();}}>Browse catalogue</TabBtn>
                  <TabBtn active={view==="proposal"} onClick={()=>setView("proposal")}>Proposal</TabBtn>
                  <TabBtn active={view==="funfacts"} onClick={()=>setView("funfacts")}>Stats</TabBtn>
                </>)}
                {!isMobile&&view!=="funfacts"&&view!=="calendar"&&<span style={{fontSize:11,color:TXT2,fontWeight:600,padding:"5px 12px",borderRadius:14,background:"rgba(255,255,255,0.06)",lineHeight:1.35,whiteSpace:"nowrap"}}><span style={{color:TXT,fontWeight:800}}>{bookedCount}</span> shows booked across <span style={{color:TXT,fontWeight:800}}>{bookedDays}</span> {bookedDays===1?"day":"days"}</span>}
                {view!=="proposal"&&view!=="jospicks"&&view!=="list"&&view!=="wishlist"&&view!=="funfacts"&&view!=="calendar"&&<button onClick={()=>setShowFilterMenu(!showFilterMenu)} style={{padding:"6px 12px",borderRadius:14,border:"none",fontSize:12,fontWeight:700,cursor:"pointer",background:showFilterMenu?TXT:"rgba(255,255,255,0.85)",color:BG,display:"inline-flex",alignItems:"center",gap:5}}><FilterIcon/> Filter {showFilterMenu?"▲":"▼"}</button>}
              </div>
            </div>
          </>
        )}
        {(view==="calendar"||showFilterMenu)&&view!=="proposal"&&view!=="jospicks"&&view!=="list"&&(
          <div style={(isMobile&&view!=="calendar")?{position:"fixed",left:0,right:0,bottom:66,zIndex:69,background:BG,borderTop:`1px solid ${CARD_BORDER}`,padding:"12px 8px 14px",maxHeight:"56vh",overflowY:"auto",boxShadow:"0 -8px 30px rgba(0,0,0,0.55)"}:{padding:"4px 8px 12px",background:BG}}>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
              {view!=="funfacts"&&<input type="text" placeholder="Search everything..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} style={{padding:"8px 14px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,fontSize:13,width:220,outline:"none",color:TXT,background:"rgba(255,255,255,0.06)"}}/>}
              {view!=="funfacts"&&fHas.org&&<MultiDrop open={openDrop==="org"} onToggle={()=>setOpenDrop(openDrop==="org"?null:"org")} label="Organisers" selected={orgFilter} onSelect={toggleOrg} onClear={()=>setOrgFilter([])} options={organiserChips.map(o=>({value:o,label:o,dot:gc(o).bg}))}/>}
              {view!=="funfacts"&&fHas.genre&&availableGenres.length>0&&<MultiDrop open={openDrop==="genre"} onToggle={()=>setOpenDrop(openDrop==="genre"?null:"genre")} label="Genre" selected={genreFilter} onSelect={toggleGenre} onClear={()=>setGenreFilter([])} options={availableGenres.map(gn=>({value:gn,label:gn}))}/>}
              {people.length>0&&fHas.people&&(
                <MultiDrop open={openDrop==="people"} onToggle={()=>setOpenDrop(openDrop==="people"?null:"people")} label="People" icon="👥" selected={peopleFilter} onSelect={togglePerson} onClear={()=>setPeopleFilter([])} options={people.map(nm=>({value:nm,label:nm}))}/>
              )}
              {view!=="funfacts"&&fHas.time&&<MultiDrop open={openDrop==="time"} onToggle={()=>setOpenDrop(openDrop==="time"?null:"time")} label="Time" selected={timeFilters} onSelect={toggleTime} onClear={()=>setTimeFilters([])} options={[{value:"morning",label:"🌅 Morning"},{value:"afternoon",label:"☀️ Afternoon"},{value:"evening",label:"🌆 Evening"},{value:"late",label:"🌙 Late"}]}/>}
            </div>
          </div>
        )}
      </div>

      {isMobile&&view!=="proposal"&&view!=="jospicks"&&(()=>{const sz=48;const def={x:(typeof window!=="undefined"?window.innerWidth:400)-sz-12,y:(typeof window!=="undefined"?window.innerHeight:800)-sz-84};const pos=fabPos||def;return(
        <button
          onPointerDown={e=>{try{e.currentTarget.setPointerCapture(e.pointerId);}catch{}fabDrag.current={sx:e.clientX,sy:e.clientY,ox:pos.x,oy:pos.y,moved:false};}}
          onPointerMove={e=>{const d=fabDrag.current;if(!d)return;const dx=e.clientX-d.sx,dy=e.clientY-d.sy;if(Math.abs(dx)+Math.abs(dy)>6)d.moved=true;if(d.moved)setFabPos({x:Math.max(4,Math.min(window.innerWidth-sz-4,d.ox+dx)),y:Math.max(4,Math.min(window.innerHeight-sz-4,d.oy+dy))});}}
          onPointerUp={()=>{const d=fabDrag.current;fabDrag.current=null;if(d&&!d.moved)setShowFilterMenu(v=>!v);}}
          aria-label="Filter view (drag to move)" title="Filter view (drag to move)"
          style={{position:"fixed",left:pos.x,top:pos.y,zIndex:72,width:sz,height:sz,borderRadius:24,border:"none",background:showFilterMenu?TXT:"rgba(255,255,255,0.92)",color:BG,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 20px rgba(0,0,0,0.5)",cursor:"grab",touchAction:"none"}}>
          <FilterIcon/>
        </button>);})()}
      {isMobile&&(
        <div style={{position:"fixed",left:0,right:0,bottom:0,zIndex:70,background:"var(--card-solid)",borderTop:`1px solid ${CARD_BORDER}`,display:"flex",gap:8,alignItems:"center",padding:"8px 10px calc(8px + env(safe-area-inset-bottom))"}}>
          <div role="navigation" aria-label="Sections" style={{flex:1,display:"flex",gap:4,overflowX:"auto"}}>
            {[["calendar","🗓","Calendar"],["map","🗺️","Map"],["list","🎫","Bookings"],["wishlist","💜","Wishlist"],["jospicks","⭐","Browse catalogue"],["proposal","📋","Proposal"],["funfacts","🎉","Stats"]].map(([id,ic,lbl])=>(
              <button key={id} onClick={()=>setView(id)} aria-label={lbl} title={lbl} style={{flex:"0 0 auto",width:42,height:42,display:"inline-flex",alignItems:"center",justifyContent:"center",borderRadius:11,border:`1px solid ${view===id?"#a855f7":CARD_BORDER}`,cursor:"pointer",fontSize:20,lineHeight:1,background:view===id?"rgba(168,85,247,0.25)":"transparent"}}>{ic}</button>
            ))}
          </div>
          
        </div>
      )}
      {view==="list"&&shareMode&&(
        <div style={{position:"fixed",left:0,right:0,bottom:isMobile?"calc(64px + env(safe-area-inset-bottom))":0,zIndex:71,background:"#1b1b30",borderTop:`1px solid ${CARD_BORDER}`,display:"flex",gap:10,alignItems:"center",justifyContent:"center",padding:"10px 12px",flexWrap:"wrap"}}>
          <span style={{fontSize:13,fontWeight:800,color:TXT}}>{shareSel.size} selected</span>
          <button onClick={copyBookingsLink} disabled={!shareSel.size} style={{padding:"9px 16px",borderRadius:12,border:"none",background:shareSel.size?ACCENT:"rgba(255,255,255,0.12)",color:"#fff",fontSize:13,fontWeight:800,cursor:shareSel.size?"pointer":"default"}}>🔗 Copy share link</button>
          <button onClick={()=>setShareSel(new Set(allShows.filter(s=>s.booked===1).map(s=>reviewKey(s))))} style={{padding:"9px 12px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:13,fontWeight:700,cursor:"pointer"}}>Select all</button>
        </div>
      )}

      {/* CALENDAR */}
      {view==="calendar"&&(
        <div style={{padding:"8px 0"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 8px 12px",position:"relative"}}>
            <NavBtn disabled={!customRange&&weekIdx===0} onClick={navPrev}>‹</NavBtn>
            <button onClick={()=>{setPickStart(weekDates[0]);setPickEnd(weekDates[weekDates.length-1]);setDatePickerOpen(o=>!o);}} title="Tap to choose your own dates" style={{fontSize:17,fontWeight:700,color:TXT,background:"none",border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6,padding:"4px 8px",borderRadius:10}}>{(()=>{const a=new Date(weekDates[0]+"T12:00:00");const b=new Date(weekDates[weekDates.length-1]+"T12:00:00");return weekDates.length===1?`${a.getDate()} ${MONTHS[a.getMonth()]}`:`${a.getDate()} ${MONTHS[a.getMonth()]} – ${b.getDate()} ${MONTHS[b.getMonth()]}`;})()} <span style={{fontSize:11,color:TXT2}}>▾</span></button>
            <NavBtn disabled={!customRange&&weekIdx>=weeks.length-1} onClick={navNext}>›</NavBtn>
            {datePickerOpen&&(
              <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",zIndex:60,background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:14,padding:14,boxShadow:"0 12px 40px rgba(0,0,0,0.6)",minWidth:250}}>
                <div style={{fontSize:12,color:TXT2,marginBottom:10,fontWeight:600,textAlign:"center"}}>Pick your dates (1–10 days)</div>
                <div style={{display:"flex",gap:8,alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
                  <input type="date" value={pickStart} onChange={e=>setPickStart(e.target.value)} style={{padding:"7px 10px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,outline:"none",colorScheme:"dark"}}/>
                  <span style={{color:TXT2,fontSize:13}}>to</span>
                  <input type="date" value={pickEnd} onChange={e=>setPickEnd(e.target.value)} style={{padding:"7px 10px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,outline:"none",colorScheme:"dark"}}/>
                </div>
                <div style={{display:"flex",gap:6,marginTop:12,justifyContent:"center",flexWrap:"wrap"}}>
                  <button onClick={()=>{setCustomRange({start:todayStr,end:todayStr});setDatePickerOpen(false);}} style={{padding:"8px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(168,85,247,0.18)",color:"#C084FC",fontSize:13,fontWeight:700,cursor:"pointer"}}>Today</button>
                  <button onClick={()=>{setCustomRange({start:weekDates[0],end:weekDates[0]});setDatePickerOpen(false);}} style={{padding:"8px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:13,fontWeight:700,cursor:"pointer"}}>Full day</button>
                  <button onClick={resetRange} style={{padding:"8px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:13,fontWeight:700,cursor:"pointer"}}>Back to weeks</button>
                  <button onClick={applyRange} style={{padding:"8px 16px",borderRadius:10,border:"none",background:ACCENT,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>Apply</button>
                </div>
              </div>
            )}
          </div>
          <div ref={gridRef} style={{overflow:"auto",maxHeight:isMobile?"calc(100vh - 215px)":"calc(100vh - 120px)",WebkitOverflowScrolling:"touch",position:"relative"}}>
            <div style={{minWidth:Math.max(320,48+weekDates.length*78),position:"relative"}}>
              <div style={{display:"grid",gridTemplateColumns:`48px repeat(${weekDates.length}, 1fr)`,borderBottom:`1px solid ${CARD_BORDER}`,position:"sticky",top:0,background:BG,zIndex:20}}>
                <div style={{position:"sticky",left:0,zIndex:21,background:BG}}/>
                {weekDates.map((ds,i)=>{const d=new Date(ds+"T12:00:00");const has=(showsByDate[ds]||[]).length>0;const isToday=ds===todayStr;return(
                  <div key={ds} style={{textAlign:"center",padding:"6px 2px 8px",background:isToday?"rgba(168,85,247,0.15)":BG,borderRadius:isToday?"8px 8px 0 0":"0"}}>
                    <div style={{fontSize:12,fontWeight:700,color:isToday?"#C084FC":TXT3,textTransform:"uppercase",letterSpacing:1}}>{DAY_NAMES_SHORT[(d.getDay()+6)%7]}</div>
                    <div style={{fontSize:20,fontWeight:800,lineHeight:1.4,color:isToday?"#C084FC":has?TXT:TXT3}}>{d.getDate()}</div>
                  </div>);})}
              </div>
              <div style={{display:"grid",gridTemplateColumns:`48px repeat(${weekDates.length}, 1fr)`,position:"relative",height:totalSlots*SH}}>
                <div style={{position:"sticky",left:0,zIndex:10,background:BG}}>
                  {Array.from({length:totalSlots*2},(_,i)=>{const mins=START_H*60+i*30;const dm=mins>=24*60?mins-24*60:mins;const half=i%2===1;return <div key={i} style={{position:"absolute",top:i*(SH/2)-7,right:6,fontSize:half?10:14,fontWeight:half?600:800,color:half?"rgba(241,240,247,0.4)":"rgba(241,240,247,0.9)",lineHeight:1}}>{half?":30":formatHour(dm)}</div>;})}
                </div>
                {weekDates.map(ds=>{const dayShows=showsByDate[ds]||[];const isToday=ds===todayStr;const timeLineTop=(()=>{if(!isToday)return null;let m=nowMinutes;if(m<START_H*60)m+=24*60;if(m>=END_H*60)return null;return((m-START_H*60)/60)*SH;})();return(
                  <div key={ds} style={{position:"relative",borderLeft:`1px solid rgba(255,255,255,0.05)`,height:totalSlots*SH,background:isToday?"rgba(168,85,247,0.06)":"transparent"}}>
                    {Array.from({length:totalSlots*2},(_,i)=>(<div key={i} style={{position:"absolute",top:i*(SH/2),left:0,right:0,height:1,background:i%2===0?"rgba(255,255,255,0.09)":"rgba(255,255,255,0.035)"}}/>))}
                    {timeLineTop!==null&&<div style={{position:"absolute",top:timeLineTop,left:0,right:0,height:2,background:"#C084FC",zIndex:5,boxShadow:"0 0 8px rgba(192,132,252,0.6)"}}><div style={{position:"absolute",left:-3,top:-3,width:8,height:8,borderRadius:4,background:"#C084FC"}}/></div>}
                    {dayShows.map((show,si)=>{const c=gc(show.organiser);const top=showTop(show);const height=showHeight(show);return(
                      <div key={si} onClick={()=>setSelectedShow(show)} style={{
                        position:"absolute",top,left:2,right:2,height,background:c.bg,color:"#fff",
                        borderRadius:8,padding:"6px 8px",cursor:"pointer",overflow:"hidden",zIndex:3,
                        lineHeight:1.25,boxShadow:`0 2px 8px ${c.glow}`,
                        border:!show.booked?"2px dashed rgba(255,255,255,0.4)":"none",opacity:show.booked?1:0.8,
                      }}>
                        <div style={{fontWeight:700,lineHeight:1.2,fontSize:14}}>{show.name}</div>
                        <div style={{opacity:0.9,marginTop:2,fontSize:12}}>{show.venue.replace("Assembly ","").replace("Gilded Balloon ","GB ").replace("Underbelly ","UB ").replace("Pleasance ","")}</div>
                        <div style={{opacity:0.9,marginTop:2,fontSize:12,fontWeight:600}}>{formatTime(show.start)}</div>
                      </div>);})}
                  </div>);})}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW ALL */}
      {view==="list"&&(
        <div style={{padding:"8px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center",padding:"0 12px 12px",flexWrap:"wrap"}}>
            <span style={{fontSize:13,color:TXT2,fontWeight:700}}>Show one day:</span>
            <input type="date" value={bookingsDay} onChange={e=>setBookingsDay(e.target.value)} style={{padding:"7px 10px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,outline:"none",colorScheme:"dark"}}/>
            {bookingsDay&&<button onClick={()=>setBookingsDay("")} style={{padding:"6px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:13,fontWeight:700,cursor:"pointer"}}>All days</button>}
            {fHas.org&&<MultiDrop open={openDrop==="org"} onToggle={()=>setOpenDrop(openDrop==="org"?null:"org")} label="Organisers" selected={orgFilter} onSelect={toggleOrg} onClear={()=>setOrgFilter([])} options={organiserChips.map(o=>({value:o,label:o,dot:gc(o).bg}))}/>}
            {people.length>0&&fHas.people&&<MultiDrop open={openDrop==="people"} onToggle={()=>setOpenDrop(openDrop==="people"?null:"people")} label="People" icon="👥" selected={peopleFilter} onSelect={togglePerson} onClear={()=>setPeopleFilter([])} options={people.map(nm=>({value:nm,label:nm}))}/>}
            {fHas.time&&<MultiDrop open={openDrop==="time"} onToggle={()=>setOpenDrop(openDrop==="time"?null:"time")} label="Time" selected={timeFilters} onSelect={toggleTime} onClear={()=>setTimeFilters([])} options={[{value:"morning",label:"🌅 Morning"},{value:"afternoon",label:"☀️ Afternoon"},{value:"evening",label:"🌆 Evening"},{value:"late",label:"🌙 Late"}]}/>}
            <button onClick={()=>{setShareMode(v=>!v);setShareSel(new Set());}} style={{padding:"6px 12px",borderRadius:10,border:`1px solid ${shareMode?"#a855f7":CARD_BORDER}`,background:shareMode?"rgba(168,85,247,0.2)":"transparent",color:shareMode?"#C084FC":TXT2,fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"normal",maxWidth:130,lineHeight:1.2,textAlign:"center"}}>{shareMode?"✕ Cancel sharing":"📤 Share bookings"}</button>
          </div>
          {bookingsDates.filter(dt=>!bookingsDay||dt===bookingsDay).map(date=>{const d=new Date(date+"T12:00:00");const dayShows=bookingsByDate[date]||[];if(!dayShows.length)return null;
            const timeSlots=[
              {label:"Morning",emoji:"🌅",filter:s=>{const m=timeToMinutes(s.start);return m!==null&&m<720;}},
              {label:"Afternoon",emoji:"☀️",filter:s=>{const m=timeToMinutes(s.start);return m!==null&&m>=720&&m<1020;}},
              {label:"Evening",emoji:"🌆",filter:s=>{const m=timeToMinutes(s.start);return m!==null&&m>=1020&&m<1320;}},
              {label:"Late",emoji:"🌙",filter:s=>{const m=timeToMinutes(s.start);return m!==null&&(m>=1320||m<120);}},
            ];
            return(
            <div key={date} style={{marginBottom:28}}>
              <div style={{display:"flex",alignItems:"baseline",gap:8,padding:"0 12px",marginBottom:12}}>
                <span style={{fontSize:40,fontWeight:900,lineHeight:1,background:ACCENT,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{d.getDate()}</span>
                <span style={{fontSize:15,fontWeight:600,color:TXT2,textTransform:"uppercase",letterSpacing:1}}>{DAYS_FULL[d.getDay()]} {MONTHS[d.getMonth()]}</span>
                <span style={{fontSize:13,color:TXT3,marginLeft:"auto"}}>{dayShows.length} show{dayShows.length!==1?"s":""}</span>
              </div>
              {timeSlots.map(slot=>{const slotShows=dayShows.filter(slot.filter);if(!slotShows.length)return null;return(
                <div key={slot.label} style={{marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,padding:"0 12px",marginBottom:6}}>
                    <span style={{fontSize:14}}>{slot.emoji}</span>
                    <span style={{fontSize:13,fontWeight:700,color:TXT2,textTransform:"uppercase",letterSpacing:1}}>{slot.label}</span>
                    <div style={{flex:1,height:1,background:CARD_BORDER,marginLeft:4}}/>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {slotShows.map((show,i)=>{const di=dayShows.indexOf(show);const prev=di>0?dayShows[di-1]:null;let gap=null;if(prev){const pe=timeToMinutes(prev.end)!=null?timeToMinutes(prev.end):timeToMinutes(prev.start);const ss=timeToMinutes(show.start);if(pe!=null&&ss!=null)gap=ss-pe;}return(<div key={i}>{gap!=null&&<div style={{textAlign:"center",margin:"1px 0 4px"}}><span style={{fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:10,background:gap<0?"rgba(239,68,68,0.15)":"rgba(52,211,153,0.15)",color:gap<0?"#EF4444":"#34D399"}}>{gap<0?`overlaps by ${-gap} min`:`${fmtGap(gap)} between shows`}</span></div>}<div style={{display:"flex",gap:8,alignItems:"stretch"}}>{shareMode&&show.booked===1&&<label style={{display:"flex",alignItems:"center",paddingLeft:6}}><input type="checkbox" checked={shareSel.has(reviewKey(show))} onChange={()=>toggleShareSel(show)} aria-label={"Select "+show.name+" to share"} style={{width:22,height:22,accentColor:"#a855f7",cursor:"pointer"}}/></label>}<div style={{flex:1,minWidth:0}}><ShowCard show={show} onClick={()=>setSelectedShow(show)} review={reviews[reviewKey(show)]} onRate={v=>setReview(show,v)} tags={tagMap[reviewKey(show)]||[]} onAddTag={t=>addTag(show,t)} onRemoveTag={t=>removeTag(show,t)}/></div></div></div>);})}
                  </div>
                </div>);})}
            </div>);})}
        </div>
      )}

      {/* WISHLIST */}
      {view==="wishlist"&&(
        <div style={{padding:"16px 8px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,margin:"0 6px 16px",flexWrap:"wrap"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><button onClick={()=>setShowFilterMenu(!showFilterMenu)} style={{padding:"6px 12px",borderRadius:14,border:"none",fontSize:13,fontWeight:700,cursor:"pointer",background:showFilterMenu?TXT:"rgba(255,255,255,0.85)",color:BG,display:"inline-flex",alignItems:"center",gap:5}}><FilterIcon/> Filter {showFilterMenu?"▲":"▼"}</button><p style={{fontSize:14,color:TXT2,margin:0}}>{filteredWishlist.length} shows in wishlist</p></div>
            <label style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:13,color:TXT2,fontWeight:600}}>Sort by
              <select value={wishlistSort} onChange={e=>setWishlistSort(e.target.value)} style={{padding:"7px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,fontWeight:700,cursor:"pointer",outline:"none",colorScheme:"dark"}}>
                <option value="name">Show name</option>
                <option value="venue">Venue number</option>
                <option value="location">Location</option>
                <option value="duration">Duration</option>
              </select>
            </label>
            {!isMobile&&<label style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:13,color:TXT2,fontWeight:600}}>Cards across
              <select value={wishCols} onChange={e=>setWishCols(Number(e.target.value))} style={{padding:"7px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,fontWeight:700,cursor:"pointer",outline:"none",colorScheme:"dark"}}>
                <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option>
              </select>
            </label>}
          </div>
          <div style={{display:isMobile?"flex":"grid",flexDirection:"column",gridTemplateColumns:isMobile?undefined:`repeat(${wishCols},minmax(0,1fr))`,gap:isMobile?6:12,alignItems:"start"}}>
            {filteredWishlist.map((show,i)=><ShowCard key={i} show={show} onClick={()=>setSelectedShow(show)} review={reviews[reviewKey(show)]} onRate={v=>setReview(show,v)} tags={tagMap[reviewKey(show)]||[]} onAddTag={t=>addTag(show,t)} onRemoveTag={t=>removeTag(show,t)} wishlist interest={interests[reviewKey(show)]} onInterest={v=>setInterest(show,v)}/>)}
          </div>
        </div>
      )}

      {/* RECOMMENDATIONS */}
      {view==="recs"&&(
        <div style={{padding:"16px 12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <p style={{fontSize:14,color:TXT2,margin:0}}>{filteredRecs.length} pick{filteredRecs.length!==1?"s":""}</p>
            <button onClick={()=>{setShowAddModal(true);setAddError("");setAddUrl("");}} style={{display:"flex",alignItems:"center",gap:5,padding:"8px 18px",borderRadius:12,border:"none",background:ACCENT,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}><PlusIcon/> Add Show</button>
          </div>
          {filteredRecs.length===0&&(
            <div style={{textAlign:"center",padding:"48px 20px",color:TXT3}}>
              <div style={{fontSize:36,marginBottom:8}}>🎭</div>
              <div style={{fontSize:16,fontWeight:600,color:TXT2}}>No picks yet</div>
              <div style={{fontSize:14,marginTop:4}}>Paste a link from any Fringe venue site</div>
            </div>
          )}
          {filteredRecs.map(rec=>{const c=gc(rec.organiser);const pc=extractPostcode(rec.address);return(
            <div key={rec.id} style={{background:CARD,border:`1px solid ${CARD_BORDER}`,borderRadius:16,padding:16,marginBottom:8,position:"relative",backdropFilter:"blur(8px)"}}>
              <button onClick={()=>removeRec(rec.id)} style={{position:"absolute",top:10,right:10,background:"none",border:"none",cursor:"pointer",color:TXT3,padding:4}}><XIcon/></button>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
                <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:6,background:"rgba(168,85,247,0.2)",color:"#C084FC"}}><StarIcon/> PICK</span>
                {rec.organiser&&<span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:6,background:`${c.bg}22`,color:c.bg}}>{rec.organiser}</span>}
              </div>
              <div style={{fontSize:18,fontWeight:700,color:TXT,marginBottom:4}}>{rec.name}</div>
              {rec.description&&<div style={{fontSize:14,color:TXT2,marginBottom:8,lineHeight:1.4}}>{rec.description}</div>}
              <div style={{display:"flex",flexWrap:"wrap",gap:10,fontSize:13,color:TXT2}}>
                {rec.venue&&<span>📍 {rec.venue}</span>}
                {rec.start&&<span style={{color:timeBucketColor(rec.start)||TXT2,fontWeight:700}}>🕐 {formatTime(rec.start)}{rec.end?` – ${formatTime(rec.end)}`:""}</span>}
                {rec.price&&<span>🎟️ {rec.price}</span>}
              </div>
              <GenrePills show={rec}/>
              <div style={{display:"flex",gap:10,marginTop:10}}>
                {rec.link&&<a href={rec.link} target="_blank" rel="noopener noreferrer" style={{fontSize:13,fontWeight:600,color:c.bg}}>View listing →</a>}
                {pc&&<a href={mapsUrl(rec)} target="_blank" rel="noopener noreferrer" style={{fontSize:13,fontWeight:600,color:"#60A5FA"}}>{pc} ↗</a>}
              </div>
            </div>);})}
        </div>
      )}

      {/* ADD MODAL */}
      {showAddModal&&(
        <div onClick={()=>!addLoading&&setShowAddModal(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:20,padding:28,maxWidth:440,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,0.6)"}}>
            <h3 style={{fontSize:22,fontWeight:800,margin:"0 0 4px",color:TXT}}>Add a Show</h3>
            <p style={{fontSize:14,color:TXT2,margin:"0 0 16px"}}>Paste a link from any Edinburgh Fringe venue website</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
              {["edfest.com","edfringe.com","Pleasance","Assembly","Gilded Balloon","Underbelly","The Stand","Monkey Barrel"].map(s=>(
                <span key={s} style={{fontSize:11,padding:"3px 8px",borderRadius:6,background:"rgba(255,255,255,0.06)",color:TXT2,fontWeight:500}}>{s}</span>
              ))}
            </div>
            <input type="url" placeholder="https://..." value={addUrl} onChange={e=>setAddUrl(e.target.value)} disabled={addLoading}
              style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,fontSize:14,outline:"none",color:TXT,background:"rgba(255,255,255,0.06)",boxSizing:"border-box",marginBottom:14}}
              onKeyDown={e=>{if(e.key==="Enter")handleAddShow();}}/>
            {addError&&<p style={{fontSize:14,color:"#FF4D6A",margin:"0 0 12px"}}>{addError}</p>}
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>setShowAddModal(false)} disabled={addLoading} style={{padding:"10px 18px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:15,fontWeight:600,cursor:"pointer"}}>Cancel</button>
              <button onClick={handleAddShow} disabled={addLoading||!addUrl.trim()} style={{padding:"10px 22px",borderRadius:12,border:"none",background:ACCENT,color:"#fff",fontSize:15,fontWeight:700,cursor:addLoading?"wait":"pointer",opacity:addLoading||!addUrl.trim()?0.5:1,display:"flex",alignItems:"center",gap:6}}>{addLoading&&<SpinnerIcon/>}{addLoading?"Extracting...":"Add Show"}</button>
            </div>
          </div>
        </div>
      )}

      {/* SHOW DETAIL MODAL */}
      {view==="proposal"&&(
        <div style={{padding:propLayout==="horizontal"?"12px 20px 40px":"12px 12px 40px",maxWidth:propLayout==="horizontal"?1360:640,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,gap:8}}>
            <p style={{fontSize:13,color:TXT2,margin:0}}>Build a day, check it fits, then share it.</p>
            <div style={{display:"flex",gap:8,flexShrink:0,flexWrap:"wrap",alignItems:"center"}}>{proposals.length>1&&layoutToggle}{proposals.length>0&&<button onClick={shareAllProposals} title="One link with every option" style={{padding:"8px 14px",borderRadius:12,border:"none",background:"rgba(96,165,250,0.2)",color:"#93C5FD",fontSize:13,fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}><ShareLinkIcon/> Share plan</button>}<button onClick={newProposal} style={{padding:"8px 14px",borderRadius:12,border:"none",background:ACCENT,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>+ New day</button></div>
          </div>
          {proposals.length===0&&<div style={{textAlign:"center",color:TXT3,fontSize:14,padding:"30px 10px"}}>No proposed days yet. Tap "+ New day" to start one.</div>}
          <div style={propLayout==="horizontal"?{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:16,alignItems:"start"}:{}}>
          {proposals.map(prop=>(
            <div key={prop.id} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:16,padding:16,marginBottom:propLayout==="horizontal"?0:20}}>
              <div style={{display:"flex",gap:8,marginBottom:collapsedProps[prop.id]?0:12,flexWrap:"wrap",alignItems:"center"}}>
                <button onClick={()=>toggleCollapse(prop.id)} title={collapsedProps[prop.id]?"Expand":"Collapse"} style={{padding:"6px",borderRadius:8,border:"none",background:"transparent",color:TXT2,cursor:"pointer",display:"flex",alignItems:"center",flexShrink:0}}><ChevronIcon open={!collapsedProps[prop.id]}/></button>
                <input value={prop.title} onChange={e=>updateProposal(prop.id,{title:e.target.value})} placeholder="Title" style={{flex:1,minWidth:90,padding:"7px 10px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:14,fontWeight:700,outline:"none"}}/>
                <div style={{position:"relative"}}>
                  <button onClick={()=>setDateOpenId(dateOpenId===prop.id?null:prop.id)} title="Set a date" style={{padding:"7px 9px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:prop.date?TXT:TXT3,fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><CalIcon/>{prop.date?(()=>{const d=new Date(prop.date+"T12:00:00");return isNaN(d.getTime())?prop.date:` ${d.getDate()} ${MONTHS[d.getMonth()]}`;})():""}</button>
                  {dateOpenId===prop.id&&<div style={{position:"absolute",top:"100%",left:0,zIndex:40,marginTop:4,background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:10,padding:10,boxShadow:"0 8px 24px rgba(0,0,0,0.5)",minWidth:210}}>
                    <input type="date" value={/^\d{4}-\d{2}-\d{2}$/.test(prop.date||"")?prop.date:""} onChange={e=>{var d=e.target.value;var patch={date:d};if(d&&(!prop.title||prop.title==="Proposed day")){var dt=new Date(d+"T12:00:00");if(!isNaN(dt.getTime()))patch.title="Proposed day "+String(dt.getDate()).padStart(2,"0")+"/"+String(dt.getMonth()+1).padStart(2,"0")+"/"+dt.getFullYear();}updateProposal(prop.id,patch);setDateOpenId(null);}} style={{width:"100%",boxSizing:"border-box",padding:"7px 10px",borderRadius:8,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,outline:"none",colorScheme:"dark"}}/>
                    <div style={{fontSize:11,color:TXT3,margin:"8px 0 4px"}}>or type your own:</div>
                    <input type="text" value={prop.date||""} onChange={e=>updateProposal(prop.id,{date:e.target.value})} placeholder="e.g. Sat 15 Aug" style={{width:"100%",boxSizing:"border-box",padding:"7px 10px",borderRadius:8,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,outline:"none"}}/>
                  </div>}
                </div>
                <button onClick={()=>shareProposal(prop)} title="Share just this option" style={{padding:"7px 12px",borderRadius:10,border:"none",background:"rgba(168,85,247,0.2)",color:"#C084FC",fontSize:13,fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}><ShareThisIcon/> Share this</button>
                <button onClick={()=>deleteProposal(prop.id)} style={{padding:"7px 10px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT3,fontSize:13,fontWeight:700,cursor:"pointer"}}>✕</button>
              </div>
              {!collapsedProps[prop.id]&&<>
              <div style={{marginTop:14}}>
                <button onClick={()=>{const opening=addOpenId!==prop.id;setAddOpenId(opening?prop.id:null);if(opening)loadCatalog();}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:12,border:"none",background:"rgba(168,85,247,0.2)",color:"#C084FC",fontSize:13,fontWeight:700,cursor:"pointer"}}><PlusIcon/> Add a show</button>
                {addOpenId===prop.id&&<AddShowList shows={[...wishlist,...recommendations,...allShows.filter(s=>s.booked),...(allCatalog||[])]} catNote={catState==="loading"?"Loading the full Fringe catalogue…":catState==="error"?"Couldn’t load the full catalogue — showing your shows only.":catState==="unconfigured"?"Tip: paste the All-tab CSV link into ALL_CSV_URL (top of the file) to search the full Fringe catalogue here.":catState==="ready-no-time-cols"?("Searching your shows + "+(allCatalog?allCatalog.length.toLocaleString():"0")+" listings — no Start time / End Time / Duration columns found in the All tab, so catalogue times show as —."):catState==="ready-empty-times"?("Searching your shows + "+(allCatalog?allCatalog.length.toLocaleString():"0")+" listings — the All tab has time columns but the cells look empty, so catalogue times show as —."):allCatalog?("Searching your shows + "+allCatalog.length.toLocaleString()+" catalogue listings ("+allCatalog.filter(s=>s.start).length.toLocaleString()+" with times)"):null} onAdd={s=>addToProposal(prop.id,s)} onDone={()=>setAddOpenId(null)}/>}
              </div>
              <ErrorBoundary><ProposalDay date={prop.date} shows={dayShowsFor(prop)}/></ErrorBoundary>
              <textarea value={prop.comment||""} onChange={e=>updateProposal(prop.id,{comment:e.target.value})} placeholder="Why you think they'll like it (optional)..." rows={2} style={{width:"100%",boxSizing:"border-box",marginBottom:12,padding:"9px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,outline:"none",resize:"vertical",fontFamily:"inherit"}}/>
              {(prop.shows||[]).length>0&&<div style={{marginTop:10,display:"flex",gap:6,flexWrap:"wrap"}}>{(prop.shows||[]).map((s,i)=>({s:s,i:i})).sort((a,b)=>{const ta=timeToMinutes(a.s.start),tb=timeToMinutes(b.s.start);return (ta==null?1e9:ta)-(tb==null?1e9:tb);}).map(({s,i})=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(168,85,247,0.15)",color:"#C084FC",padding:"3px 9px",borderRadius:8,fontSize:12,fontWeight:600}}>{s.start?formatTime(s.start)+" · ":""}{s.name}<span onClick={()=>removeFromProposal(prop.id,i)} style={{cursor:"pointer",opacity:0.8}}>✕</span></span>))}</div>}
              </>}
            </div>
          ))}
          </div>
        </div>
      )}

      {view==="funfacts"&&(()=>{const f=funFacts;const fmtDate=d=>{if(!d)return "—";const x=new Date(d+"T12:00:00");return `${DAYS_FULL[x.getDay()]} ${x.getDate()} ${MONTHS[x.getMonth()]}`;};const cap=w=>w?w.charAt(0).toUpperCase()+w.slice(1):"—";const now=new Date();const past=s=>!!(s&&s.date&&new Date(s.date+"T23:59:59")<now);const tiles=[
        {n:f.booked,l:"shows booked 🎫",cl:"#C084FC",big:true},
        {n:f.days,l:"days with shows booked 📅",cl:"#60A5FA",big:true},
        {n:f.attended,l:"shows attended so far 👀",cl:"#34D399",big:true},
        {n:f.org.value||"—",l:"you saw the most shows from this promoter 🎪",cl:"#F59E0B"},
        {n:fmtDate(f.topDay),l:`your busiest day, you saw a whopping ${f.topDayN} show${f.topDayN!==1?"s":""} 🔥`,cl:"#F472B6"},
        {n:f.topMate.values.length?f.topMate.values.join(", "):"—",l:f.topMate.values.length>1?"your top festival buddies 🙌":"your top festival buddy 🙌",cl:"#38BDF8"},
        {n:cap(f.topBucket),l:"when you see the most shows 🕐",cl:"#A855F7"},
        {n:f.mostExp?f.mostExp.price:"—",l:(f.mostExp?((past(f.mostExp)?"your most expensive show was ":"your priciest booking so far is ")+f.mostExp.name):"your most expensive show")+" 💸",cl:"#EF4444"},
        {n:f.cheapest?(f.cheapest.price||"Free"):"—",l:(f.cheapest?(((!f.cheapest.price||poundsOf(f.cheapest.price)===0)?(past(f.cheapest)?"you bagged a freebie - well done! - and saw ":"a freebie you have lined up: "):(past(f.cheapest)?"the cheapest show you watched was ":"your cheapest booking so far is "))+f.cheapest.name):"your cheapest show")+" 🪙",cl:"#34D399"},
        {n:f.totalMin>0?fmtGap(f.totalMin):"—",l:`you spent hours watching Fringe shows — a total of ${(f.totalMin/1440).toFixed(1)} days! ⏳`,cl:"#F472B6"},
        {n:f.tightest!=null?fmtGap(f.tightest):"—",l:"tightest turnaround — glad you made it across North Bridge on time! 🏃",cl:"#FB7185"},
        {n:f.topVenue?(f.topVenue.code||f.topVenue.name||"—"):"—",l:"where you hung out the most 📍",cl:"#22D3EE"},
        {n:f.earliest?formatTime(f.earliest.start):"—",l:f.earliest?((past(f.earliest)?"was your earliest start time":"your earliest start time so far")+(timeToMinutes(f.earliest.start)<720?" - you early bird! 🐦":" - not one to compromise a long lie! 😴")):"your earliest show",cl:"#FCD34D"},
        {n:f.latest?formatTime(f.latest.start):"—",l:(f.latest&&past(f.latest)?"was your latest show":"your latest show so far")+" — you night owl! 🦉",cl:"#818CF8"},
        {n:f.longest?(f.longest.duration||"—"):"—",l:(f.longest?((past(f.longest)?"how long you spent watching ":"how long you will spend watching ")+f.longest.name):"your longest show")+" 🍿",cl:"#34D399"},
      ];return(
        <div style={{padding:"18px 14px 50px",maxWidth:760,margin:"0 auto"}}>
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
              <button onClick={()=>setPeopleFilter([])} style={{padding:"4px 10px",borderRadius:16,border:`1px solid ${peopleFilter.length===0?"transparent":CARD_BORDER}`,background:peopleFilter.length===0?ACCENT:"rgba(255,255,255,0.06)",color:peopleFilter.length===0?"#fff":TXT2,fontSize:11,fontWeight:700,cursor:"pointer"}}>Me</button>
              {people.filter(nm=>nm.toLowerCase()!=="me").map(nm=>{const on=peopleFilter.length===1&&peopleFilter[0]===nm;return <button key={nm} onClick={()=>setPeopleFilter([nm])} style={{padding:"4px 10px",borderRadius:16,border:`1px solid ${on?"transparent":CARD_BORDER}`,background:on?ACCENT:"rgba(255,255,255,0.06)",color:on?"#fff":TXT2,fontSize:11,fontWeight:700,cursor:"pointer"}}>{nm}</button>;})}
            </div>
          </div>
          <h2 style={{fontSize:32,fontWeight:900,textAlign:"center",margin:"0 0 4px",letterSpacing:"-0.5px",lineHeight:1.15}}><span style={{marginRight:8}}>🎉</span><span style={{background:ACCENT,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:"drop-shadow(0 2px 12px rgba(168,85,247,0.45))"}}>Here are your 2026 Fringe stats!</span><span style={{marginLeft:8}}>🎉</span></h2>
          <p style={{textAlign:"center",color:TXT2,fontSize:14,marginBottom:22}}>A summary of your Fringe experience this year.</p>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2, 1fr)":"repeat(3, 1fr)",gap:12,alignItems:"stretch"}}>
            {tiles.map((t,i)=>(<div key={i} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:16,padding:"16px 14px",textAlign:"center"}}>
              <div style={{fontSize:t.big?42:22,fontWeight:900,color:t.cl,lineHeight:1.1,wordBreak:"break-word"}}>{t.n}</div>
              <div style={{fontSize:12,color:TXT2,marginTop:6,lineHeight:1.35}}>{t.l}</div>
            </div>))}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",marginTop:12}}>
            <div style={{flex:"1 1 260px",maxWidth:360,background:"rgba(52,211,153,0.08)",border:"1px solid rgba(52,211,153,0.3)",borderRadius:16,padding:16}}>
              <div style={{fontSize:20,fontWeight:900,color:"#34D399"}}>{f.favs.length} favourite{f.favs.length!==1?"s":""} 👍👍</div>
              <div style={{fontSize:13,color:TXT2,marginTop:6,lineHeight:1.4}}>{f.favs.length?f.favs.map(s=>s.name).join(", "):"No two-thumbs-up reviews yet."}</div>
            </div>
            <div style={{flex:"1 1 260px",maxWidth:360,background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:16,padding:16}}>
              <div style={{fontSize:20,fontWeight:900,color:"#EF4444"}}>{f.hated.length} you disliked 👎👎</div>
              <div style={{fontSize:13,color:TXT2,marginTop:6,lineHeight:1.4}}>{f.hated.length?f.hated.map(s=>s.name).join(", "):"Nothing you hated — nice!"}</div>
            </div>
          </div>
        </div>
      );})()}

      {view==="jospicks"&&(
        <div style={{padding:"14px 12px 50px",maxWidth:1000,margin:"0 auto"}}>
          <p style={{fontSize:13,color:TXT2,margin:"0 0 14px"}}>Browse the full Fringe programme{allCatalog?(" · "+allCatalog.length.toLocaleString()+" shows"):""}. Use the search box above to find shows.</p>
          {catState==="loading"?<div style={{textAlign:"center",color:TXT3,fontSize:14,padding:"40px 10px"}}>Loading the full catalogue…</div>:catState==="error"?<div style={{textAlign:"center",color:TXT3,fontSize:14,padding:"40px 10px"}}>Couldn’t load the catalogue — check the All-tab CSV link.</div>:(()=>{const base=allCatalog||[];const filtered=catFiltered;const capped=filtered.slice(0,120);return (<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gridAutoRows:"252px",gap:12}}>{capped.map(s=>{const iw=wishlist.some(w=>reviewKey(w)===reviewKey(s));const ib=allShows.some(w=>w.booked&&reviewKey(w)===reviewKey(s));return <JoCard key={s.name+"|"+s.venue} show={s} readOnly onOpen={()=>setSelectedShow(s)} onWish={()=>catAddWish(s)} onBook={()=>setBookingShow(s)} inWish={iw} inBook={ib}/>;})}</div>
            {filtered.length>capped.length&&<div style={{textAlign:"center",color:TXT3,fontSize:13,padding:"16px"}}>Showing the first 120 of {filtered.length.toLocaleString()} — search above to narrow.</div>}
            {filtered.length===0&&<div style={{textAlign:"center",color:TXT3,fontSize:14,padding:"30px 10px"}}>{base.length?"No shows match your search.":"No shows found."}</div>}
          </>);})()}
          <button onClick={()=>setCatFilterOpen(true)} aria-label="Filters" title="Filters" style={{position:"fixed",right:16,bottom:isMobile?92:26,zIndex:500,width:52,height:52,borderRadius:26,border:"none",cursor:"pointer",background:ACCENT,color:"#fff",boxShadow:"0 6px 20px rgba(168,85,247,0.5)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18l-7 8v6l-4 2v-8z"/></svg>
            {catFiltersActive&&<span style={{position:"absolute",top:9,right:9,width:9,height:9,borderRadius:5,background:"#fff",border:"1px solid #a855f7"}}/>}
          </button>
          {catFilterOpen&&(
            <div onClick={()=>setCatFilterOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:1300,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 12px",overflowY:"auto"}}>
              <div onClick={e=>e.stopPropagation()} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:16,maxWidth:760,width:"100%",padding:"16px 16px 24px",maxHeight:"85vh",overflowY:"auto",boxSizing:"border-box"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{fontSize:18,fontWeight:900,color:TXT}}>Filters</div>
                  <div style={{display:"flex",gap:8}}>
                    {catFiltersActive&&<button onClick={()=>{setCatGenre([]);setCatAge("");setCatCountry("");setCatDur("");setCatStart("");setCatPMin(0);setCatPMax(null);setCatVenue([]);setCatExp("");setCatAcc(false);setCatDate("");setCatRunFrom("");setCatRunTo("");}} title="Reset filters" style={{width:36,height:36,borderRadius:8,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:16,cursor:"pointer"}}>↺</button>}
                    <button onClick={()=>setCatFilterOpen(false)} aria-label="Close" style={{width:36,height:36,borderRadius:8,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:18,cursor:"pointer"}}>✕</button>
                  </div>
                </div>
                <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="🔎 Search shows, artists, venues…" style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:14,outline:"none",marginBottom:10}}/>
                <div style={{marginBottom:10}}><MultiDrop open={catODrop==="genre"} onToggle={()=>setCatODrop(catODrop==="genre"?null:"genre")} label="All genres" icon="🎭" selected={catGenre} onSelect={toggleCatGenre} onClear={()=>setCatGenre([])} options={catGenreOpts.map(g=>({value:g,label:g}))}/></div><div style={{marginBottom:10}}><MultiDrop open={catODrop==="venue"} onToggle={()=>setCatODrop(catODrop==="venue"?null:"venue")} label="Venue (name, # or postcode)" icon="📍" selected={catVenue} onSelect={toggleCatVenue} onClear={()=>setCatVenue([])} options={catVenueOpts}/></div>
                <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"1fr 1fr 1fr 1fr",gap:8,marginBottom:12}}>
                  <select value={catAge} onChange={e=>setCatAge(e.target.value)} aria-label="Age" style={catSelStyle}><option value="">Any age</option>{catAgeOpts.map(a=><option key={a} value={a}>{a}</option>)}</select>
                  <select value={catCountry} onChange={e=>setCatCountry(e.target.value)} aria-label="Country" style={catSelStyle}><option value="">All countries</option>{catCountryOpts.map(cc=><option key={cc} value={cc}>{cc}</option>)}</select>
                  <select value={catDur} onChange={e=>setCatDur(e.target.value)} aria-label="Duration" style={catSelStyle}><option value="">Any duration</option><option value="short">Under 1 hour</option><option value="med">1–2 hours</option><option value="long">Over 2 hours</option></select>
                  <select value={catStart} onChange={e=>setCatStart(e.target.value)} aria-label="Start time" style={catSelStyle}><option value="">Any start</option><option value="morning">🌅 Morning</option><option value="afternoon">☀️ Afternoon</option><option value="evening">🌆 Evening</option><option value="late">🌙 Late</option></select>
                  <select value={catExp} onChange={e=>setCatExp(e.target.value)} aria-label="Experience level" style={catSelStyle}><option value="">Experience level</option>{catExpOpts.map(x=><option key={x} value={x}>{x}</option>)}</select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:8,marginBottom:12}}>
                  <label style={{display:"flex",flexDirection:"column",gap:4,fontSize:11,color:TXT3,fontWeight:700}}>On date<input type="date" value={catDate} onChange={e=>setCatDate(e.target.value)} style={catSelStyle}/></label>
                  <div style={{display:"flex",flexDirection:"column",gap:4}}><span style={{fontSize:11,color:TXT3,fontWeight:700}}>Runs between</span><div style={{display:"flex",gap:6}}><input type="date" value={catRunFrom} onChange={e=>setCatRunFrom(e.target.value)} style={catSelStyle}/><input type="date" value={catRunTo} onChange={e=>setCatRunTo(e.target.value)} style={catSelStyle}/></div></div>
                </div>
                <label style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:TXT2,cursor:"pointer",marginBottom:12}}><input type="checkbox" checked={catAcc} onChange={e=>setCatAcc(e.target.checked)} style={{width:16,height:16,cursor:"pointer"}}/>♿ Only shows with accessibility info</label>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,flexWrap:"wrap",background:"rgba(255,255,255,0.03)",border:`1px solid ${CARD_BORDER}`,borderRadius:10,padding:"8px 12px"}}>
                  <span style={{fontSize:12,fontWeight:800,color:TXT,whiteSpace:"nowrap"}}>💷 Price £{catPMin}–£{catPMax==null?catPriceMax:catPMax}{catPMax==null?"+":""}</span>
                  <input type="range" min={0} max={catPriceMax} value={catPMin} onChange={e=>{const v=Number(e.target.value);setCatPMin(Math.min(v,catPMax==null?catPriceMax:catPMax));}} style={{flex:1,minWidth:80,accentColor:"#A855F7"}}/>
                  <input type="range" min={0} max={catPriceMax} value={catPMax==null?catPriceMax:catPMax} onChange={e=>{const v=Number(e.target.value);setCatPMax(v>=catPriceMax?null:Math.max(v,catPMin));}} style={{flex:1,minWidth:80,accentColor:"#A855F7"}}/>
                </div>
                <button onClick={()=>setCatFilterOpen(false)} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:ACCENT,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer"}}>Show {catFiltered.length.toLocaleString()} shows</button>
              </div>
            </div>
          )}
        </div>
      )}

      {view==="map"&&(
        <div style={{padding:"12px 12px 30px",maxWidth:1000,margin:"0 auto"}}>
          <p style={{fontSize:13,color:TXT2,margin:"0 0 10px"}}>Your booked venues on the map — open <b>Filter</b> to narrow by organiser, genre, time and more.</p>
          <div ref={mapRef} style={{height:"calc(100vh - 210px)",minHeight:380,borderRadius:14,overflow:"hidden",border:`1px solid ${CARD_BORDER}`,background:"#0e0e1c",position:"relative",zIndex:0,isolation:"isolate"}}/>
        </div>
      )}

      {helpOpen&&<HelpModal rows={help} onClose={()=>setHelpOpen(false)}/>}
      {syncOpen&&<SyncModal onClose={()=>setSyncOpen(false)}/>}
      {bookingShow&&<BookingDialog show={bookingShow} onClose={()=>setBookingShow(null)} onConfirm={(date,time)=>catConfirmBook(bookingShow,date,time)}/>}

      {selectedShow&&(
        <div onClick={()=>setSelectedShow(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}}>
          <div ref={modalRef} onClick={e=>e.stopPropagation()} onTouchStart={e=>{dragStart.current=(modalRef.current&&modalRef.current.scrollTop<=0)?e.touches[0].clientY:null;}} onTouchMove={e=>{if(dragStart.current!=null){const dy=e.touches[0].clientY-dragStart.current;setDragY(dy>0?dy:0);}}} onTouchEnd={()=>{if(dragY>110)setSelectedShow(null);setDragY(0);dragStart.current=null;}} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:20,padding:28,maxWidth:420,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,0.6)",boxSizing:"border-box",position:"relative",maxHeight:"90vh",overflowY:"auto",transform:dragY?`translateY(${dragY}px)`:"none",transition:dragY?"none":"transform 0.25s ease",touchAction:dragY>0?"none":"auto"}}>
            <button onClick={()=>setSelectedShow(null)} aria-label="Close" style={{position:"fixed",top:18,right:18,zIndex:1001,width:36,height:36,borderRadius:18,background:"rgba(21,21,40,0.92)",border:`1px solid ${CARD_BORDER}`,fontSize:20,cursor:"pointer",color:TXT,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,boxShadow:"0 2px 8px rgba(0,0,0,0.4)"}}>×</button>
            <div style={{width:40,height:5,borderRadius:3,background:"rgba(255,255,255,0.25)",margin:"-14px auto 14px"}}/>
            <div style={{display:"inline-block",fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:8,marginBottom:14,background:gc(selectedShow.organiser).bg,color:"#fff",letterSpacing:"0.5px"}}>{selectedShow.organiser}</div>
            <h2 style={{fontSize:24,fontWeight:800,margin:"0 0 4px",color:TXT,lineHeight:1.2}}>{selectedShow.name}</h2>
            <div style={{fontSize:14,color:TXT2,marginBottom:18}}>{selectedShow.venue}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 16px",fontSize:15,marginBottom:18}}>
              {selectedShow.date&&<Dt l="Date">{(()=>{const d=new Date(selectedShow.date+"T12:00:00");return`${DAYS_FULL[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;})()}</Dt>}
              {!selectedShow.date&&<Dt l="Date">TBC</Dt>}
              <Dt l="Time">{selectedShow.start?formatTime(selectedShow.start):"TBC"}{selectedShow.end?` – ${formatTime(selectedShow.end)}`:""}</Dt>
              <Dt l="Price">{selectedShow.price||"TBC"}</Dt>
              {selectedShow.duration&&<Dt l="Duration">{selectedShow.duration}</Dt>}
              {selectedShow.attendees&&<div style={{gridColumn:"1 / -1"}}>
                <div style={{fontSize:12,color:TXT3,marginBottom:4,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Going</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {selectedShow.attendees.split(",").map((p,pi)=>(
                    <span key={pi} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,255,255,0.08)",color:TXT,padding:"4px 10px",borderRadius:20,fontSize:13,fontWeight:600}}><UserIcon/>{p.trim()}</span>
                  ))}
                </div>
              </div>}
              <Dt l="Status"><span style={{color:selectedShow.booked?"#34D399":"#FB923C",fontWeight:700}}>{selectedShow.booked?"Booked ✓":"Not booked"}</span>{selectedShow.ltf&&<span style={{marginLeft:8,fontSize:11,background:"rgba(255,186,8,0.15)",color:"#FFBA08",padding:"2px 7px",borderRadius:6,fontWeight:700}}>LoveTheFringe</span>}</Dt>
              {selectedShow.availability&&<Dt l="Availability"><span style={{color:selectedShow.availability==="Sold Out"?"#EF4444":selectedShow.availability==="Limited"?"#FB923C":selectedShow.availability==="Available"?"#34D399":TXT,fontWeight:700}}>{selectedShow.availability}</span></Dt>}
              {genresOf(selectedShow).length>0&&<div style={{gridColumn:"1 / -1"}}><div style={{fontSize:12,color:TXT3,marginBottom:6,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Genre</div><GenrePills show={selectedShow}/></div>}
            </div>
            {selectedShow.booked&&(
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,color:TXT3,marginBottom:6,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Your review</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {RATINGS.map(r=>{const sel=reviews[reviewKey(selectedShow)]===r.v;return(
                    <button key={r.v} onClick={()=>setReview(selectedShow,r.v)} title={r.label} style={{display:"flex",alignItems:"center",gap:4,padding:"7px 10px",borderRadius:10,cursor:"pointer",border:`1px solid ${sel?r.color:CARD_BORDER}`,background:sel?`${r.color}22`:"transparent",color:r.color,fontSize:12,fontWeight:700}}>
                      <ThumbGroup opt={r} size={16}/>{sel?r.label:""}
                    </button>
                  );})}
                </div>
              </div>
            )}
            {!selectedShow.booked&&(
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,color:TXT3,marginBottom:6,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Interest</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {INTERESTS.map(it=>{const sel=interests[reviewKey(selectedShow)]===it.v;return(
                    <button key={it.v} onClick={()=>setInterest(selectedShow,sel?null:it.v)} title={it.label} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 10px",borderRadius:10,cursor:"pointer",border:`1px solid ${sel?it.color:CARD_BORDER}`,background:sel?`${it.color}22`:"transparent",color:it.color,fontSize:12,fontWeight:700}}>
                      <InterestIcon kind={it.icon} size={15}/>{it.label}
                    </button>
                  );})}
                </div>
              </div>
            )}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,color:TXT3,marginBottom:6,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Tags</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
                {(tagMap[reviewKey(selectedShow)]||[]).map((t,ti)=>(
                  <span key={ti} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(96,165,250,0.15)",color:"#93C5FD",padding:"4px 10px",borderRadius:8,fontSize:13,fontWeight:600}}>{t}<span onClick={()=>removeTag(selectedShow,t)} style={{cursor:"pointer",opacity:0.7}}>✕</span></span>
                ))}
                {modalTagAdding?(
                  <input autoFocus value={modalTagInput} onChange={e=>setModalTagInput(e.target.value)} onBlur={()=>{if(modalTagInput.trim())addTag(selectedShow,modalTagInput.trim());setModalTagInput("");setModalTagAdding(false);}} onKeyDown={e=>{if(e.key==="Enter"){if(modalTagInput.trim())addTag(selectedShow,modalTagInput.trim());setModalTagInput("");setModalTagAdding(false);}else if(e.key==="Escape"){setModalTagInput("");setModalTagAdding(false);}}} placeholder="tag" style={{width:100,padding:"4px 10px",borderRadius:8,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,outline:"none"}}/>
                ):(
                  <button onClick={()=>setModalTagAdding(true)} style={{display:"inline-flex",alignItems:"center",gap:3,padding:"4px 10px",borderRadius:8,border:`1px dashed ${CARD_BORDER}`,background:"transparent",color:TXT3,fontSize:13,fontWeight:600,cursor:"pointer"}}>+ Tag</button>
                )}
              </div>
            </div>
            {selectedShow.notes&&<div style={{fontSize:14,color:TXT2,fontStyle:"italic",marginBottom:12}}>{selectedShow.notes}</div>}
            {selectedShow.address&&(()=>{const pc=extractPostcode(selectedShow.address);return(
              <div style={{fontSize:14,color:TXT2,marginBottom:18}}>📍 {pc?(<>{selectedShow.address.replace(pc,"").replace(/,\s*$/,"")}{", "}<a href={mapsUrl(selectedShow)} target="_blank" rel="noopener noreferrer" title={(selectedShow.lat!=null&&selectedShow.lng!=null?"Opens exact coordinates ("+selectedShow.lat+", "+selectedShow.lng+")":"No coordinates for this show — opens address search")} style={{color:"#60A5FA",fontWeight:600}}>{pc}</a></>):(<a href={mapsUrl(selectedShow)} target="_blank" rel="noopener noreferrer" title={(selectedShow.lat!=null&&selectedShow.lng!=null?"Opens exact coordinates ("+selectedShow.lat+", "+selectedShow.lng+")":"No coordinates for this show — opens address search")} style={{color:"#60A5FA"}}>{selectedShow.address}</a>)}</div>);})()}
            {selectedShow.link&&<a href={selectedShow.link} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",padding:"12px 16px",borderRadius:12,background:gc(selectedShow.organiser).bg,color:"#fff",textDecoration:"none",fontSize:15,fontWeight:700}}>View Listing →</a>}
            {selectedShow.date&&selectedShow.start&&(
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <button onClick={()=>downloadShowICS(selectedShow)} style={{flex:1,padding:"11px 12px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:14,fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7}}><AppleIcon/> Add to iCal</button>
                <a href={gcalUrl(selectedShow)} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:"11px 12px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,textDecoration:"none",fontSize:14,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7}}><GoogleIcon/> Add to Calendar</a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEGEND */}
      <div style={{padding:"24px 12px 40px",borderTop:`1px solid ${CARD_BORDER}`,marginTop:16}}>
        <div style={{fontSize:11,color:TXT3,marginBottom:10,textTransform:"uppercase",letterSpacing:2,fontWeight:700}}>Festival Organisers</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {Object.entries(OC).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,c])=>(<div key={name} style={{display:"flex",alignItems:"center",gap:5,fontSize:13}}><div style={{width:8,height:8,borderRadius:4,background:c.bg,boxShadow:`0 0 6px ${c.glow}`}}/><span style={{color:TXT2}}>{name}</span></div>))}
        </div>
        <div style={{marginTop:22,paddingTop:18,borderTop:`1px solid ${CARD_BORDER}`,textAlign:"center"}}>
          <button onClick={()=>{setFeedbackSent(false);setShowFeedback(true);}} style={{background:"none",border:"none",padding:0,cursor:"pointer",fontSize:14,fontWeight:700,color:"#93C5FD"}}>Got feedback? Leave it here.</button>
        </div>
      </div>
      {showFeedback&&(
        <div onClick={()=>setShowFeedback(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:20,padding:24,maxWidth:420,width:"100%",boxSizing:"border-box",boxShadow:"0 24px 80px rgba(0,0,0,0.6)"}}>
            {feedbackSent?(
              <div style={{textAlign:"center",padding:"10px 0"}}>
                <div style={{fontSize:40,marginBottom:8}}>🎉</div>
                <div style={{fontSize:18,fontWeight:800,color:TXT,marginBottom:6}}>Thanks for the feedback!</div>
                <div style={{fontSize:13,color:TXT2,marginBottom:18}}>It's been sent straight to Jo's sheet.</div>
                <button onClick={()=>setShowFeedback(false)} style={{padding:"10px 20px",borderRadius:12,border:"none",background:ACCENT,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>Close</button>
              </div>
            ):(
              <>
                <div style={{fontSize:18,fontWeight:800,color:TXT,marginBottom:4}}>Got feedback?</div>
                <div style={{fontSize:13,color:TXT2,marginBottom:14}}>Bugs, ideas, shows I've missed — leave it here and it'll go straight to Jo.</div>
                <textarea value={feedbackText} onChange={e=>setFeedbackText(e.target.value)} placeholder="Type your feedback..." rows={5} style={{width:"100%",boxSizing:"border-box",padding:"12px 14px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:14,outline:"none",resize:"vertical",fontFamily:"inherit"}}/>
                <div style={{display:"flex",gap:8,marginTop:14,justifyContent:"flex-end"}}>
                  <button onClick={()=>setShowFeedback(false)} style={{padding:"10px 16px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:14,fontWeight:700,cursor:"pointer"}}>Cancel</button>
                  <button onClick={submitFeedback} disabled={!feedbackText.trim()} style={{padding:"10px 20px",borderRadius:12,border:"none",background:ACCENT,color:"#fff",fontSize:14,fontWeight:700,cursor:feedbackText.trim()?"pointer":"default",opacity:feedbackText.trim()?1:0.5}}>Send</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const RATINGS=[
  {v:1,dir:"down",n:2,color:"#EC2D6F",label:"Hated it"},
  {v:2,dir:"down",n:1,color:"#F77FA6",label:"Meh"},
  {v:3,dir:"side",n:1,color:"#94A3B8",label:"OK"},
  {v:4,dir:"up",n:1,color:"#6EE7A8",label:"Good"},
  {v:5,dir:"up",n:2,color:"#10B981",label:"Loved it"},
];
const THUMB_PATH="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.727a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z";
function Thumb({dir="up",size=18}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{transform:dir==="down"?"rotate(180deg)":dir==="side"?"rotate(90deg)":"none",display:"block"}}><path d={THUMB_PATH}/></svg>;}
function ThumbGroup({opt,size=16}){return <span style={{display:"inline-flex",alignItems:"center",gap:1,color:opt.color}}>{Array.from({length:opt.n}).map((_,k)=><Thumb key={k} dir={opt.dir} size={size}/>)}</span>;}
function AppleIcon(){return <svg width="15" height="15" viewBox="0 0 384 512" fill="currentColor" style={{display:"block"}}><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.1 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>;}
function GoogleIcon(){return <svg width="15" height="15" viewBox="0 0 48 48" style={{display:"block"}}><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>;}
function timeBucketColor(start){const m=timeToMinutes(start);if(m===null)return null;if(m<720)return"#F59E0B";if(m<1020)return"#38BDF8";if(m<1320)return"#A855F7";return"#6366F1";}
const VENUES=[["tynecastlepark",55.93909,-3.23235,"eh112nl"],["novotel",55.94494,-3.19967,"eh39de"],["outsideappletontowercrichtonst",55.94455,-3.18748,"eh89le"],["edinburghcitychambersmeetingpoint",55.95028,-3.19021,"eh11yj"],["meetingpointatbridgendfarmhouse",55.92691,-3.15372,"eh164te"],["royalcollegeofnursingscotland",55.92891,-3.19481,"eh92hh"],["stjohnswestendfair",55.95004,-3.20606,"eh24bj"],["greyfriarshallatvirginhotelsedinburgh",55.94809,-3.19338,"eh11jr"],["kruathaicookeryschool",55.91872,-3.16654,"eh166aq"],["vegantipples",55.95811,-3.18737,"eh13lh"],["laughinghorsethehanovertap",55.9546,-3.19803,"eh21dr"],["stmaryscatholiccathedral",55.95623,-3.18744,"eh13jd"],["lochrinrooftopbar",55.94282,-3.21025,"eh39fq"],["lauristoncastle",55.97127,-3.27773,"eh46ad"],["stjohnschurch",55.95014,-3.20601,"eh12ab"],["beaverhallartstudios",55.9656,-3.19303,"eh74je"],["artglassstudio34",55.97545,-3.18028,"eh64ae"],["themagdalenchapel",55.94816,-3.19217,"eh11jr"],["thescotchmaltwhiskysocietythevaults",55.97399,-3.17225,"eh66bz"],["outsidescottishpoetrylibrary",55.95142,-3.17849,"eh88dt"],["thecumberlandbar",55.9591,-3.19713,"eh36rt"],["gingertwiststudio",55.95724,-3.17034,"eh75dp"],["thethreesisters",55.94899,-3.18973,"eh11js"],["stjamesgoldenacre",55.97073,-3.20887,"eh35px"],["justthetonicatlabelleangele",55.94834,-3.18748,"eh11hj"],["drneilsgarden",55.94152,-3.14742,"eh153px"],["mansfieldtraquaircentre",55.95973,-3.19048,"eh36bb"],["sacredheartchurch",55.94533,-3.20121,"eh39dj"],["sneakypetes",55.94827,-3.19152,"eh11jw"],["duncanstreetbaptistchurch",55.93521,-3.17815,"eh91sr"],["museumofmagicfortunetellingandwitchcraft",55.9508,-3.18589,"eh11ss"],["scottlawriegallery",55.94627,-3.20638,"eh38gb"],["laughinghorsedropkickmurphys",55.94785,-3.19144,"eh12qd"],["meetingpointatcharlottesquare",55.95178,-3.20766,"eh24hq"],["modern",55.952,-3.22422,"eh43ds"],["stninianshall",55.95899,-3.22524,"eh41ag"],["libraryofmistakes",55.95069,-3.21343,"eh37qb"],["thestandatwedinburgh",55.95494,-3.18907,"eh13ax"],["statueofsirjamesyoungsimpson",55.95079,-3.20529,"eh23aa"],["nicolsonsquarevenues",55.94572,-3.18551,"eh89bx"],["stmichaelandallsaints",55.94371,-3.2025,"eh39jh"],["physiciansgallery",55.95512,-3.19678,"eh21jq"],["galeriemirages",55.95938,-3.21215,"eh41hl"],["tlafinejewellery",55.95828,-3.20658,"eh35al"],["fruitmarket",55.9513,-3.18949,"eh11df"],["thevoodoorooms",55.95367,-3.19063,"eh22aa"],["bonnieandwildsscottishmarketplace",55.9554,-3.18987,"eh13ae"],["whiskibarandrestaurant",55.95056,-3.18643,"eh11sg"],["thedundasstreetgallery",55.9563,-3.19888,"eh36hz"],["centralhall",55.94312,-3.20528,"eh39bp"],["christchurchmorningside",55.93464,-3.21034,"eh104dd"],["cyanclayworkscic",55.97644,-3.17113,"eh66ja"],["caskandvine",55.95077,-3.18252,"eh88ab"],["citadelyouthcentre",55.97738,-3.17529,"eh66je"],["psandgschurch",55.9567,-3.18878,"eh13hu"],["eve",55.94814,-3.19282,"eh11jr"],["oldsaintpaulschurch",55.95119,-3.18712,"eh11dh"],["thescottishgallery",55.95656,-3.1991,"eh36hz"],["saintstephenstheatre",55.95857,-3.20349,"eh35ab"],["stcuthbertschurch",55.94948,-3.20546,"eh12ep"],["holyrooddistillery",55.94302,-3.17753,"eh89sh"],["theweemuseumofmemory",55.97999,-3.1796,"eh66jj"],["oceanterminal",55.98085,-3.17788,"eh66jj"],["nationalmuseumofscotland",55.94736,-3.19,"eh11jf"],["thepend",55.94948,-3.18965,"eh11ae"],["patriothall",55.95916,-3.2061,"eh35ay"],["pbhsfreefringepilgrim",55.94881,-3.18605,"eh11ly"],["kellertaproom",55.95731,-3.18764,"eh13ly"],["stockbridgeceramics",55.95999,-3.2062,"eh35bj"],["themothersuperior",55.96952,-3.17313,"eh65hb"],["gladstonesland",55.94945,-3.19363,"eh12nt"],["nationalrecordsofscotland",55.95381,-3.18935,"eh13yy"],["meetingpointoutsideofmonkeybarrelcomedy",55.94938,-3.18782,"eh11qr"],["theroyalscotsclubedinburgh",55.95651,-3.19742,"eh36qe"],["thestandcomedyclub",55.95587,-3.19215,"eh13eb"],["meetingpointpotterrowunderpasslothianstreetside",55.94662,-3.18795,"eh89aa"],["shopwithnoname",55.95871,-3.18901,"eh13rx"],["pbhsfreefringethestreet",55.95681,-3.18774,"eh13jt"],["scottishartsclub",55.94876,-3.20965,"eh12bw"],["passtheatre",55.97731,-3.24498,"eh51qe"],["leitharches",55.96886,-3.17227,"eh68ly"],["pbhsfreefringestrathmorebar",55.96388,-3.1763,"eh68sg"],["theatrebigtop",55.94711,-3.20659,"eh39su"],["leithmakers",55.96894,-3.17301,"eh68np"],["scottishtextilesshowcase",55.95027,-3.18366,"eh11su"],["venue13",55.95233,-3.17806,"eh88bl"],["frenchinstituteinscotland",55.94931,-3.19233,"eh11rn"],["inverleithstserfschurchcentre",55.97206,-3.20501,"eh53bd"],["outhousebar",55.9574,-3.18697,"eh13ly"],["valvonaandcrolla",55.95851,-3.18354,"eh74aa"],["newingtontrinitychurch",55.93314,-3.17713,"eh91tq"],["tigerlily",55.95247,-3.20512,"eh24jn"],["lilylunaedinburghjewelleryboutique",55.94994,-3.18346,"eh11sx"],["argylecellarbar",55.93825,-3.19149,"eh91jj"],["thescottishparliament",55.95199,-3.17519,"eh991sp"],["stgilescathedral",55.94966,-3.19084,"eh11re"],["outsidegreyfriarsbobbybar",55.94687,-3.1914,"eh12qe"],["ukrainiancommunitycentre",55.95693,-3.17875,"eh75ab"],["inspace",55.94501,-3.1866,"eh89ab"],["stmarysepiscopalcathedral",55.94862,-3.21657,"eh125aw"],["edinburghphotographicsociety",55.95776,-3.20135,"eh36qu"],["hopecitychurchedinburgh",55.93001,-3.29923,"eh129eb"],["outsideedinburghsfestivaltheatrenexttothefestivaltheatrecafesidedoor",55.94659,-3.18577,"eh89ft"],["meetingpointatcockburnstcorneroffleshmarketclose",55.95065,-3.18877,"eh11bs"],["bannermans",55.94882,-3.18655,"eh11nq"],["blackfordandgrange",55.93428,-3.19342,"eh92dw"],["thesalvationarmyedinburghcitycorps",55.94808,-3.18249,"eh89tf"],["canongatekirk",55.95151,-3.17932,"eh88bn"],["lifecarecentre",55.95834,-3.21296,"eh41jb"],["stbridescommunitycentre",55.9426,-3.2199,"eh112dz"],["panmurehouse",55.95225,-3.1784,"eh88bl"],["theedinburghacademy",55.96032,-3.20355,"eh35bl"],["artspacestmarks",55.94856,-3.20543,"eh12dp"],["traverseelsewhere",55.93722,-3.2067,"eh39pl"],["stramash",55.94848,-3.1878,"eh11jq"],["leithdepot",55.96836,-3.17403,"eh65dt"],["monkeybarrelcomedyniddrystreet",55.94894,-3.18661,"eh11lg"],["justthetonicatwestsiderodeo",55.94818,-3.19155,"eh11jw"],["canonmillschurch",55.96272,-3.19827,"eh35lh"],["stceciliashall",55.94885,-3.18649,"eh11lg"],["laughinghorsethepeartree",55.94458,-3.18539,"eh89dd"],["edinburghcentralmosque",55.94509,-3.18587,"eh89bt"],["greyfriarskirk",55.94678,-3.19222,"eh12qq"],["universityofedinburghinformaticsforum",55.94487,-3.18696,"eh89ab"],["pleasancegrassmarket",55.94682,-3.19515,"eh39eq"],["laughinghorsehomebar",55.94229,-3.2025,"eh39jp"],["ericliddellcommunity",55.93393,-3.20977,"eh104dp"],["munrocommunitycentre",55.96047,-3.28985,"eh47nt"],["palmerstonplacechurch",55.94727,-3.21585,"eh125aa"],["thequeenshall",55.94128,-3.18148,"eh89jg"],["albaflamenca",55.94394,-3.18197,"eh89hq"],["thejazzbar",55.94796,-3.18703,"eh11hr"],["pleasancepopupleitharches",55.96895,-3.17253,"eh68ly"],["edinburghplayhouse",55.95735,-3.18533,"eh13aa"],["laughinghorsebrassmonkeyleith",55.96416,-3.17776,"eh65br"],["ghilliedhu",55.94994,-3.20783,"eh12ad"],["meetingpointathighstreetwellhead",55.95003,-3.18938,"eh11qx"],["outofthebluedrillhall",55.96483,-3.17418,"eh68rg"],["scotartstmargaretshouse",55.95571,-3.15238,"eh76ae"],["teatrofisico",55.9513,-3.18949,"eh11df"],["santucoffeeroastery",55.95854,-3.18644,"eh13lr"],["wu",55.95512,-3.19574,"eh21je"],["thestandatedinburghfoodanddrinkacademy",55.95523,-3.19557,"eh21je"],["traversethelyceumstudio",55.94691,-3.20444,"eh39ax"],["cartscvenuescdigital",55.94991,-3.1895,"onlinevenue"],["lighthouseedinburghsradicalbookshop",55.94476,-3.18547,"eh89db"],["yoteledinburgh",55.95397,-3.20614,"eh24na"],["meadowbanksportscentre",55.95625,-3.15642,"eh76ae"],["dynamicearth",55.95079,-3.17465,"eh88as"],["edinburghnewtownchurch",55.95392,-3.19577,"eh22pa"],["meetingpointatuplandsroastcoffeeshop",55.9425,-3.19009,"eh89ld"],["mercatcrossparliamentsquare",55.94976,-3.19019,"eh11rf"],["laughinghorsefreddys",55.95247,-3.20041,"eh22jr"],["meetingpointatholyroodparkentranceonholyroodparkroad",55.94154,-3.17174,"eh165bq"],["eiffleiththeatre",55.97573,-3.18031,"eh64ae"],["justthetonicatsubway",55.94814,-3.19163,"eh11jw"],["theroyaloak",55.94803,-3.18588,"eh11lt"],["cartscvenuescalto",55.94877,-3.19366,"eh12jl"],["laughinghorsewestportoracle",55.9464,-3.19898,"eh12ld"],["laughinghorsedragonfly",55.94639,-3.1995,"eh12ld"],["deafaction",55.95731,-3.18967,"eh13qy"],["stcolumbasbythecastlescottishepiscopalchurch",55.94832,-3.19551,"eh12pw"],["brewhemia",55.95122,-3.18915,"eh11de"],["portrait",55.95554,-3.1936,"eh21jd"],["thestandatthescotsman",55.95121,-3.18839,"eh11tr"],["canonsgait",55.95083,-3.18242,"eh88dq"],["laughinghorsethethreesisters",55.94824,-3.19019,"eh11js"],["tipsymidgie",55.9436,-3.17821,"eh89sb"],["national",55.95093,-3.19569,"eh22el"],["themeltingpot",55.95313,-3.1865,"eh88dl"],["artspace",55.93597,-3.13173,"eh164nx"],["paradiseinthevault",55.94773,-3.19126,"eh12qd"],["laughinghorsewestnicrecords",55.94467,-3.18513,"eh89dd"],["pbhsfreefringeccblooms",55.95704,-3.18509,"eh13aa"],["theparliamentarms",55.95229,-3.17686,"eh88bt"],["labelleangelesneakypetesandbannermansbar",55.94854,-3.18756,"eh11jd"],["nationallibraryofscotland",55.94869,-3.19196,"eh11ew"],["laughinghorsethebrassmonkey",55.94733,-3.18523,"eh89tu"],["eifffilmhouse",55.94658,-3.20608,"eh39bz"],["eiffcineworld",55.94131,-3.21827,"eh111af"],["eiffthecameo",55.94281,-3.20378,"eh39lz"],["stvincents",55.95822,-3.20353,"eh36sw"],["broughtonhighschool",55.96063,-3.2216,"eh41eg"],["pbhsfreefringegreekgyrosgrill",55.94938,-3.18724,"eh11hn"],["laughinghorsekickasscowgate",55.94797,-3.19307,"eh11jr"],["thespeakeasyattheroyalscotsclub",55.95647,-3.19778,"eh36qe"],["scottishpoetrylibrary",55.95147,-3.17809,"eh88dt"],["laughinghorsecocoboho",55.95234,-3.20552,"eh24jn"],["thebakery",55.959,-3.17918,"eh75jg"],["woolkindhq",55.93509,-3.19495,"eh91aj"],["laughinghorsebar50",55.9491,-3.18601,"eh11ne"],["oldmerchantshallthepipersrest",55.94978,-3.18803,"eh11qw"],["theliquidroom",55.94855,-3.1936,"eh12he"],["pbhsfreefringefingerspianobar",55.9541,-3.20087,"eh21lh"],["continigeorgestreet",55.95288,-3.20226,"eh23es"],["coyoteuglyedinburgh",55.95081,-3.20577,"eh24aw"],["dovecotstudios",55.94809,-3.1853,"eh11lt"],["edinburghfoodanddrinkacademy",55.95523,-3.19557,"eh21je"],["underbellycowgate",55.94816,-3.19229,"eh11jx"],["nicolsonsquarevenues",55.9456,-3.18592,"eh89bx"],["thescotchmaltwhiskysocietyqueenstreet",55.9545,-3.19964,"eh21jx"],["laughinghorsetheragingbull",55.94521,-3.20492,"eh39aa"],["labelleangele",55.94874,-3.18751,"eh11hj"],["pbhsfreefringeliquidroom",55.94855,-3.19356,"eh12he"],["assemblyhall",55.94981,-3.19528,"eh12lu"],["pbhsfreefringediggersleith",55.97542,-3.16714,"eh66pw"],["assemblygeorgesquarestudios",55.94351,-3.18684,"eh89lh"],["traversetheatre",55.94762,-3.20484,"eh12ed"],["bedlamtheatre",55.94629,-3.19072,"eh11ez"],["eiffmonkeybarrelcomedy",55.94938,-3.18782,"eh11qr"],["hootspotterrow",55.94669,-3.1879,"eh89aa"],["eifftollcrosscentralhall",55.94394,-3.20425,"eh39bp"],["pbhsfreefringebannermans",55.94882,-3.18655,"eh11nq"],["broughtonstmarysparishchurch",55.96026,-3.19341,"eh36ne"],["scottishcomedyfestivalwaverleybar",55.95046,-3.18424,"eh11ta"],["scottishcomedyfestivalthebeehiveinn",55.94738,-3.19689,"eh12ju"],["stockbridgechurch",55.96014,-3.20666,"eh35bn"],["laughinghorsethecountinghouse",55.94468,-3.18512,"eh89dd"],["pbhsfreefringeslowprogresscafeandrecords",55.94948,-3.18562,"eh11nb"],["necrobus",55.94851,-3.19225,"eh12ex"],["thestandcomedyclub2",55.95587,-3.19215,"eh21hj"],["zoosouthside",55.94426,-3.18396,"eh89er"],["theroyalscotsclub",55.95644,-3.19793,"eh36qe"],["shedinburghassemblycheckpoint",55.94623,-3.18999,"eh11ey"],["hootstheapex",55.94709,-3.19667,"eh12hs"],["thespaceonthemile",55.95017,-3.18689,"eh11th"],["jacksonthetailor",55.95387,-3.18823,"eh13at"],["alchemiststjamesquarter",55.95432,-3.18871,"eh13ad"],["paradiseinaugustines",55.94755,-3.19158,"eh11el"],["thespacevenue45",55.95121,-3.18709,"eh11dh"],["brawvenueshillstreet",55.95355,-3.20285,"eh23jp"],["justthetonicnucleus",55.94564,-3.18069,"eh89rr"],["assemblygeorgesquaregardens",55.94342,-3.18707,"eh89lh"],["thegildedsaloon",55.94629,-3.18924,"eh11hb"],["noblesbybellfield",55.97533,-3.16731,"eh66rs"],["underbellygeorgesquare",55.94318,-3.18955,"eh89lh"],["frankensteinpub",55.94736,-3.19166,"eh11en"],["gildedballoonatthemuseum",55.94657,-3.18859,"eh11hb"],["pleasancedome",55.94602,-3.18841,"eh89al"],["gildedballoonpatterhouse",55.94804,-3.18732,"eh11ht"],["gildedballoonteviot",55.94512,-3.18861,"eh89aj"],["assemblydancebase",55.94748,-3.19704,"eh12ju"],["alchemistcocktailbarandrestaurant",55.95342,-3.19888,"eh22ht"],["pleasanceateicc",55.94585,-3.2098,"eh38ee"],["gildedballoonatthekingstheatre",55.9419,-3.20287,"eh39lq"],["barntonbunker",55.95979,-3.27797,"eh47bn"],["thescottishcafeandrestaurant",55.95179,-3.19639,"eh22el"],["rotundatheatre",55.94531,-3.19374,"eh39eq"],["assemblygeorgesquare",55.9444,-3.18778,"eh89lh"],["justthetonicatthecaves",55.94862,-3.18641,"eh11lg"],["thespaceniddryst",55.94979,-3.18684,"eh11th"],["cartscvenuescaquila",55.94873,-3.19441,"eh12pw"],["cartscvenuescaurora",55.94529,-3.20136,"eh39dj"],["manahatta",55.95305,-3.19575,"eh22qa"],["zooplayground",55.94874,-3.18428,"eh11lz"],["underbellybristosquare",55.94553,-3.18893,"eh89ag"],["brawvenuesgrandlodge",55.95249,-3.20255,"eh23dh"],["justthetonicatthemashhouse",55.94852,-3.18706,"eh11jg"],["pbhsfreefringetheouthousebar",55.95747,-3.18678,"eh13ly"],["pbhsfreefringesupercubecowgate",55.94875,-3.18718,"eh11jq"],["summerhall",55.9399,-3.18234,"eh91pl"],["laughinghorsebostonbarnewtown",55.95486,-3.19807,"eh21dr"],["thestandcomedyclub3and4",55.95635,-3.19052,"eh13ep"],["pbhsfreefringesouthsider",55.94532,-3.18371,"eh89ef"],["pbhsfreefringewhistlebinkies",55.94994,-3.18725,"eh11ll"],["pbhsfreefringepizzageekseasterroad",55.95983,-3.17139,"eh75rj"],["pbhsfreefringethetailorcafeandwinebar",55.95765,-3.17085,"eh75dr"],["pbhsfreefringecanonsgait",55.95083,-3.18242,"eh88dq"],["pbhsfreefringe3oldmonks",55.97653,-3.17119,"eh66ja"],["pbhsfreefringebrewdogdoghousehotel",55.95124,-3.18256,"eh88bh"],["thespacetriplex",55.94607,-3.18506,"eh89dp"],["thespacesymposiumhall",55.94671,-3.18411,"eh89dr"],["justthetonicatthehive",55.94974,-3.187,"eh11lg"],["pbhsfreefringesupercubegeorgestreet",55.9531,-3.19922,"eh22lr"],["scottishstorytellingcentre",55.95059,-3.18506,"eh11sr"],["pbhsfreefringebansheelabyrinth",55.9494,-3.18684,"eh11lg"],["greensideriddlescourt",55.94922,-3.1936,"eh12pg"],["brownsofleith",55.97752,-3.16907,"eh66qs"],["pbhsfreefringecentralyouthhostel",55.9601,-3.18309,"eh74al"],["thespacesurgeonshall",55.94668,-3.18554,"eh89dw"],["monkeybarrelcomedy",55.94938,-3.18782,"eh11qr"],["laughinghorsecitycafe",55.94924,-3.18773,"eh11qr"],["greensidegeorgestreet",55.95355,-3.19657,"eh22pq"],["assemblyroxy",55.94745,-3.18427,"eh89su"],["hootsnicolsonsquare",55.94556,-3.18612,"eh89bx"],["pbhsfreefringebrewdoglothianrd",55.94771,-3.20693,"eh39by"],["hootstheweeredbar",55.94617,-3.19791,"eh39df"],["cityofedinburghtoursoldpolicebox",55.94993,-3.18816,"eh11qs"],["lemonde",55.95349,-3.19586,"eh22pf"],["assemblyrooms",55.95317,-3.19879,"eh22lr"],["pbhsfreefringecarbon",55.94874,-3.18717,"eh11nq"],["pleasancecourtyard",55.94774,-3.18193,"eh89tj"],["underbellyscircushubonthemeadows",55.94095,-3.19017,"eh99ex"],["pbhsfreefringevoodoorooms",55.95367,-3.19061,"eh22aa"],["hootshiltonbreadstreet",55.94576,-3.20414,"eh39af"],["monkeybarrelcomedycabaretvoltaire",55.94901,-3.1871,"eh11qr"],["arthurconandoylecentre",55.94927,-3.21793,"eh125ap"],["edinburghthistlehotel",55.95043,-3.21734,"eh37eg"],["fringecentral",55.94787,-3.18542,"eh11ls"],["thecastlerockcafe",55.94975,-3.19335,"eh12nt"],["monkeybarrelcomedyatoneillsthetron",55.94975,-3.18763,"eh11qw"],["pianodromeatstoswaldscentre",55.93705,-3.21122,"eh104nb"]];
function venueCoords(show){const norm=s=>String(s||"").toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]/g,"");const n=norm(show&&show.venue);let v=VENUES.find(x=>x[0]===n);if(!v)v=VENUES.find(x=>x[0].length>=8&&(n.startsWith(x[0])||x[0].startsWith(n)));if(!v){const pc=norm(extractPostcode(show&&show.address)||"");if(pc)v=VENUES.find(x=>x[3]===pc);}return v?{lat:v[1],lng:v[2]}:null;}
function haversineM(a,b){const R=6371000,d=Math.PI/180;const dLat=(b.lat-a.lat)*d,dLng=(b.lng-a.lng)*d;const s=Math.sin(dLat/2)**2+Math.cos(a.lat*d)*Math.cos(b.lat*d)*Math.sin(dLng/2)**2;return 2*R*Math.asin(Math.sqrt(s));}
function walkMinutes(a,b){const c1=venueCoords(a),c2=venueCoords(b);if(!c1||!c2)return null;return Math.max(1,Math.round(haversineM(c1,c2)/80));}
function requiredGapMin(a,b){const w=walkMinutes(a,b);return 30+(w||0);}
function poundsOf(p){if(!p)return 0;const s=String(p).toLowerCase();if(s.includes("free"))return 0;const m=s.match(/(\d+(?:\.\d+)?)/);return m?parseFloat(m[1]):0;}
function fmtMin(m){if(m==null)return "—";m=((m%1440)+1440)%1440;const h=Math.floor(m/60),mm=m%60;const ap=h>=12?"pm":"am";const h12=h===0?12:h>12?h-12:h;return `${h12}:${String(mm).padStart(2,"0")}${ap}`;}
function proposalStats(shows){const st=[],en=[];let cost=0;(shows||[]).forEach(s=>{cost+=poundsOf(s.price);const a=timeToMinutes(s.start);if(a!=null){st.push(a);let e=timeToMinutes(s.end);if(e==null)e=a;if(e<a)e+=1440;en.push(e);}});return{startMin:st.length?Math.min(...st):null,endMin:en.length?Math.max(...en):null,cost};}
const JO_LANES=[{id:"all",name:"All"},{id:"newbies",name:"Must sees for newbies"},{id:"pros",name:"Seasoned Pros"},{id:"wild",name:"Wildcards"},{id:"new",name:"New for this Year"}];
function joSort(a,b){const ta=timeToMinutes(a.start),tb=timeToMinutes(b.start);const na=ta==null?1e9:ta,nb=tb==null?1e9:tb;if(na!==nb)return na-nb;return String(a.name||"").localeCompare(String(b.name||""));}
function encodeJoPicks(byLane){try{const arr=[];Object.keys(byLane).forEach(lane=>{if(!lane||lane==="Uncategorised")return;byLane[lane].forEach(s=>arr.push([s.name,s.venue,s.start,s.end,s.price,s.link||"",s.date||"",lane]));});return LZString.compressToEncodedURIComponent(JSON.stringify(arr));}catch(e){return "";}}
function decodeJoPicks(t){try{const s=LZString.decompressFromEncodedURIComponent(t);if(s){const arr=JSON.parse(s);if(Array.isArray(arr)){const map={};arr.forEach(a=>{const it={name:a[0],venue:a[1],start:a[2],end:a[3],price:a[4],link:a[5]||"",date:a[6]||""};const lane=(a[7]||"Uncategorised").toString();(map[lane]=map[lane]||[]).push(it);});return map;}}}catch(e){}return null;}
function parseJoCsv(csv){try{const r=Papa.parse(csv,{skipEmptyLines:true});const rows=r.data;const map={};if(rows.length<2)return map;for(let k=1;k<rows.length;k++){const row=rows[k];const lane=(row[0]||"").toString().trim()||"Uncategorised";const it={name:(row[1]||"").toString().trim(),venue:(row[2]||"").toString().trim(),start:(row[3]||"").toString().trim(),end:(row[4]||"").toString().trim(),price:(row[5]||"").toString().trim(),link:(row[6]||"").toString().trim(),date:(row[7]||"").toString().trim()};if(!it.name)continue;(map[lane]=map[lane]||[]).push(it);}return map;}catch(e){return null;}}
function BookingDialog({show,onClose,onConfirm}){
  const [date,setDate]=useState("");
  const [time,setTime]=useState(show.start||"");
  const needTime=!show.start;
  const can=!!date&&!!time;
  return (<div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:1400,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div onClick={e=>e.stopPropagation()} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:16,maxWidth:380,width:"100%",padding:22,boxSizing:"border-box"}}>
      <div style={{fontSize:18,fontWeight:900,color:TXT,marginBottom:4}}>Mark as booked</div>
      <div style={{fontSize:14,color:TXT2,marginBottom:16}}>{show.name}</div>
      <div style={{fontSize:12,color:TXT3,fontWeight:700,marginBottom:4}}>Date you booked *</div>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:14,outline:"none",colorScheme:"dark"}} />
      <div style={{fontSize:12,color:TXT3,fontWeight:700,margin:"12px 0 4px"}}>Start time {needTime?"*":""}</div>
      <input type="time" value={time} onChange={e=>setTime(e.target.value)} style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:14,outline:"none",colorScheme:"dark"}} />
      {needTime&&<div style={{fontSize:11,color:"#FB923C",marginTop:6}}>This show has no listed time — please add one.</div>}
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:18}}>
        <button onClick={onClose} style={{padding:"9px 14px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:14,fontWeight:700,cursor:"pointer"}}>✕ Cancel</button>
        <button onClick={()=>{if(can)onConfirm(date,time);}} disabled={!can} style={{padding:"9px 16px",borderRadius:10,border:"none",background:ACCENT,color:"#fff",fontSize:14,fontWeight:800,cursor:can?"pointer":"not-allowed",opacity:can?1:0.5}}>🎫 Confirm</button>
      </div>
    </div>
  </div>);
}
function JoCard({show,readOnly,lane,lanes,onLane,onOpen,dragProps,onWish,onBook,inWish,inBook}){
  const c=gc2(show.organiser);
  const timeStr=show.start?(formatTime(show.start)+(show.end?(" – "+formatTime(show.end)):"")):"";
  const btn={display:"inline-flex",alignItems:"center",gap:5,padding:"6px 10px",borderRadius:9,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:12,fontWeight:700,cursor:"pointer",textDecoration:"none"};
  return (
    <div {...(dragProps||{})} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderLeft:`4px solid ${c.bg}`,borderRadius:12,padding:"12px 14px",cursor:dragProps?"grab":"default",height:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div onClick={onOpen} style={{cursor:onOpen?"pointer":"default",flex:"1 1 auto",minHeight:0,overflow:"hidden"}}>
        <div style={{fontSize:18,fontWeight:800,color:TXT,lineHeight:1.2,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{show.name}</div>
        {timeStr&&<div style={{fontSize:15,color:TXT2,marginTop:7,fontWeight:600}}>{timeStr}</div>}
        {show.price&&<div style={{fontSize:16,color:TXT,marginTop:4,fontWeight:800}}>{show.price}</div>}
        {show.venue&&<div style={{fontSize:15,color:TXT2,marginTop:4}}>{show.venue}</div>}
        <GenrePills show={show}/>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",flexShrink:0,paddingTop:10}}>
        {onWish&&<button onClick={e=>{e.stopPropagation();onWish();}} title={inWish?"Remove from wishlist":"Add to wishlist"} aria-label="Add to wishlist" style={{width:34,height:34,borderRadius:9,border:`1px solid ${inWish?"#a855f7":CARD_BORDER}`,background:inWish?"rgba(168,85,247,0.2)":"transparent",color:inWish?"#C084FC":TXT3,fontSize:16,cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center"}}>{inWish?"💜":"♡"}</button>}
        {onBook&&<button onClick={e=>{e.stopPropagation();onBook();}} title={inBook?"Booked":"Mark as booked"} aria-label="Mark as booked" style={{width:34,height:34,borderRadius:9,border:`1px solid ${inBook?"#34D399":CARD_BORDER}`,background:inBook?"rgba(52,211,153,0.2)":"transparent",color:inBook?"#34D399":TXT3,fontSize:15,cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center"}}>🎫</button>}
        {show.link&&<a href={show.link} target="_blank" rel="noopener noreferrer" style={btn}>View Listing ↗</a>}
        {!readOnly&&onLane&&<select value={lane} onChange={e=>onLane(e.target.value)} onClick={e=>e.stopPropagation()} style={{marginLeft:"auto",padding:"6px 8px",borderRadius:9,border:`1px solid ${CARD_BORDER}`,background:"var(--card-solid)",color:TXT,fontSize:12,fontWeight:700,cursor:"pointer",colorScheme:"dark"}}><option value="">Uncategorised</option>{lanes.map(l=>(<option key={l} value={l}>{l}</option>))}</select>}
      </div>
    </div>
  );
}
function decProp_(o){return{title:o.t||"",date:o.d||"",comment:o.c||"",shows:(o.s||[]).map(a=>({name:a[0],venue:a[1],start:a[2],end:a[3],price:a[4],booked:a[5]?1:0,organiser:a[6],link:a[7]||"",genres:a[8]||"",fullAddress:a[9]||""}))};}
function encodeBookings(shows){try{return LZString.compressToEncodedURIComponent(JSON.stringify({b:(shows||[]).map(x=>[x.name,x.venue,x.start,x.end,x.price,x.organiser,x.link||"",x.date||"",x.fullAddress||x.address||"",x.duration||"",x.lat!=null?x.lat:"",x.lng!=null?x.lng:""])}));}catch(e){return "";}}
function decodeBookings(t){try{const s=LZString.decompressFromEncodedURIComponent(t);if(s){const o=JSON.parse(s);if(o&&Array.isArray(o.b))return o.b.map(a=>({name:a[0],venue:a[1],start:a[2],end:a[3],price:a[4],organiser:a[5],link:a[6]||"",date:a[7]||"",address:a[8]||"",fullAddress:a[8]||"",duration:a[9]||"",lat:(a[10]!==""&&a[10]!=null?Number(a[10]):null),lng:(a[11]!==""&&a[11]!=null?Number(a[11]):null),booked:1}));}}catch(e){}return null;}
function encodeProposals(props){try{return LZString.compressToEncodedURIComponent(JSON.stringify({m:(props||[]).map(p=>({t:p.title||"",d:p.date||"",c:p.comment||"",s:(p.shows||[]).map(x=>[x.name,x.venue,x.start,x.end,x.price,x.booked?1:0,x.organiser,x.link,x.genres||"",x.fullAddress||x.address||""])}))}));}catch(e){return "";}}
function decodeProposals(t){try{const s=LZString.decompressFromEncodedURIComponent(t);if(s){const o=JSON.parse(s);if(o&&Array.isArray(o.m))return o.m.map(decProp_);if(o&&Array.isArray(o.s))return [decProp_(o)];if(o&&o.shows)return [o];}}catch(e){}try{const o=JSON.parse(decodeURIComponent(atob(t)));if(o){if(Array.isArray(o.m))return o.m.map(decProp_);if(o.shows)return [o];}}catch(e){}return null;}
function encodeProposal(o){try{const c={t:o.title||"",d:o.date||"",s:(o.shows||[]).map(x=>[x.name,x.venue,x.start,x.end,x.price,x.booked?1:0,x.organiser,x.link,x.genres||"",x.fullAddress||x.address||""])};return LZString.compressToEncodedURIComponent(JSON.stringify(c));}catch(e){return "";}}
function decodeProposal(t){try{const s=LZString.decompressFromEncodedURIComponent(t);if(s){const o=JSON.parse(s);if(o&&Array.isArray(o.s))return{title:o.t||"",date:o.d||"",shows:o.s.map(a=>({name:a[0],venue:a[1],start:a[2],end:a[3],price:a[4],booked:a[5]?1:0,organiser:a[6],link:a[7]||"",genres:a[8]||"",fullAddress:a[9]||""}))};if(o&&o.shows)return o;}}catch(e){}try{return JSON.parse(decodeURIComponent(atob(t)));}catch(e){return null;}}
class ErrorBoundary extends Component{
  constructor(p){super(p);this.state={err:null};}
  static getDerivedStateFromError(e){return {err:e};}
  render(){if(this.state.err)return <div style={{padding:24,color:TXT,fontFamily:"system-ui,-apple-system,sans-serif",maxWidth:600,margin:"0 auto"}}><div style={{fontWeight:800,fontSize:18,marginBottom:8}}>Something went wrong.</div><div style={{fontSize:13,color:"#F87171",marginBottom:14,wordBreak:"break-word"}}>{String((this.state.err&&this.state.err.message)||this.state.err)}</div><button onClick={()=>{try{location.reload();}catch(e){}}} style={{padding:"9px 18px",borderRadius:10,border:"none",background:"#A855F7",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>Reload</button></div>;return this.props.children;}
}
function AddShowList({shows,onAdd,catNote,onDone}){
  const [q,setQ]=useState("");
  const t=q.trim().toLowerCase();
  const list=(()=>{const base=[...(shows||[])].filter(s=>s&&s.name).sort((a,b)=>{const ta=timeToMinutes(a.start),tb=timeToMinutes(b.start);return (ta==null?1e9:ta)-(tb==null?1e9:tb);}).filter(s=>!t||s.name.toLowerCase().includes(t)||(s.venue||"").toLowerCase().includes(t)||(s.artist||"").toLowerCase().includes(t));const seen=new Set();const dd=[];for(const s of base){const k=s.name.toLowerCase()+"|"+((s.venue||"").toLowerCase());if(seen.has(k))continue;seen.add(k);dd.push(s);}return dd;})();
  const capped=list.slice(0,60);
  return (<div style={{marginTop:8}}>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by show, venue or artist..." aria-label="Search shows to add" style={{width:"100%",padding:"7px 10px",borderRadius:8,border:`1px solid ${CARD_BORDER}`,background:"rgba(255,255,255,0.06)",color:TXT,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:6}}/>
    {catNote&&<div style={{fontSize:11,color:TXT3,margin:"0 2px 8px"}}>{catNote}</div>}
    <div style={{maxHeight:"max(240px, calc(100vh - 320px))",overflowY:"auto",border:`1px solid ${CARD_BORDER}`,borderRadius:10}}>
      {capped.map((s,i)=>(<div key={i} onClick={()=>onAdd(s)} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderBottom:`1px solid ${CARD_BORDER}`,cursor:"pointer"}}>
        <span style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,color:TXT,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:600}}>{s.start?formatTime(s.start)+" · ":""}{s.name}</div>
          <div style={{fontSize:11,color:TXT3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>📍 {s.venueCode?"#"+s.venueCode+" ":""}{s.venue}{s.duration?" · "+s.duration+(/^\d+$/.test(String(s.duration))?"m":""):""}</div>
        </span>
        {s.price?<span style={{flexShrink:0,fontSize:15,fontWeight:800,color:TXT}}>{s.price}</span>:null}
        <span style={{flexShrink:0,width:26,height:26,borderRadius:8,background:"rgba(168,85,247,0.25)",color:"#C084FC",fontSize:16,fontWeight:800,lineHeight:"26px",textAlign:"center"}}>+</span>
      </div>))}
      {list.length>capped.length&&<div style={{padding:"8px 10px",fontSize:11,color:TXT3,textAlign:"center"}}>Showing the first 60 of {list.length.toLocaleString()} matches — keep typing to narrow.</div>}
      {list.length===0&&<div style={{padding:"10px",fontSize:12,color:TXT3,textAlign:"center"}}>No matches.</div>}
    </div>
    {onDone&&<button onClick={onDone} style={{width:"100%",marginTop:8,padding:"9px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"rgba(168,85,247,0.12)",color:"#C084FC",fontSize:13,fontWeight:800,cursor:"pointer"}}>Done adding</button>}
  </div>);
}
function HelpIcon(){return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.3 9a2.7 2.7 0 0 1 5.2 1c0 1.9-2.5 2.2-2.5 3.4"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/></svg>;}
function HelpModal({rows,onClose}){
  return (<div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:1100,display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"30px 12px"}}>
    <div onClick={e=>e.stopPropagation()} style={{background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:16,maxWidth:600,width:"100%",padding:"22px 22px 26px",position:"relative"}}>
      <button onClick={onClose} style={{position:"absolute",top:12,right:12,background:"none",border:"none",color:TXT2,fontSize:22,cursor:"pointer"}}>✕</button>
      <div style={{fontSize:20,fontWeight:900,marginBottom:14,color:TXT}}>Help</div>
      {rows==="loading"&&<div style={{color:TXT2,fontSize:14}}>Loading…</div>}
      {rows==="error"&&<div style={{color:"#fca5a5",fontSize:14}}>Couldn't load help — make sure a sheet called "Help - me" exists and the spreadsheet is shared as "Anyone with the link can view".</div>}
      {Array.isArray(rows)&&rows.length===0&&<div style={{color:TXT3,fontSize:14}}>No help content yet.</div>}
      {Array.isArray(rows)&&rows.map((r,i)=>{const head=(r[0]||"").trim(),body=(r.length>1?r.slice(1).filter(Boolean).join("  "):"").trim();if(!head&&!body)return null;if(head&&body)return <div key={i} style={{marginBottom:14}}><div style={{fontSize:15,fontWeight:800,color:TXT,marginBottom:3}}>{head}</div><div style={{fontSize:14,color:TXT2,lineHeight:1.55,whiteSpace:"pre-wrap"}}>{body}</div></div>;return <div key={i} style={{fontSize:14,color:TXT2,lineHeight:1.55,marginBottom:10,whiteSpace:"pre-wrap"}}>{head||body}</div>;})}
      <div style={{marginTop:18,paddingTop:16,borderTop:`1px solid ${CARD_BORDER}`}}>
        <div style={{fontSize:15,fontWeight:800,color:TXT,marginBottom:4}}>Your data</div>
        <div style={{fontSize:13,color:TXT3,lineHeight:1.5,marginBottom:10}}>Your reviews, tags and proposals are saved in this browser only. Download a backup before clearing your browser or switching device — then restore it anywhere.</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={downloadBackup} style={{padding:"9px 14px",borderRadius:10,border:"none",background:ACCENT,color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer"}}>⬇ Download backup</button>
          <label style={{padding:"9px 14px",borderRadius:10,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT,fontSize:13,fontWeight:800,cursor:"pointer",display:"inline-flex",alignItems:"center"}}>↥ Restore from file<input type="file" accept="application/json,.json" style={{display:"none"}} onChange={e=>{const f=e.target.files&&e.target.files[0];if(f)restoreBackup(f,()=>window.location.reload());}}/></label>
        </div>
      </div>
    </div>
  </div>);
}
function RowsIcon(){return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>;}
function ColsIcon(){return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="3" width="4" height="18" rx="1"/><rect x="10" y="3" width="4" height="18" rx="1"/><rect x="16" y="3" width="4" height="18" rx="1"/></svg>;}
function ShareLinkIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>;}
function ShareThisIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 13.3l7.6 4.4M15.8 6.3l-7.6 4.4"/></svg>;}
function CalIcon({size=16}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;}
function ChevronIcon({open}){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{transform:open?"none":"rotate(-90deg)",transition:"transform 0.15s"}}><path d="M6 9l6 6 6-6"/></svg>;}
function OpenIcon({size=13}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6"/><path d="M20 4 L10 14"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>;}
function fmtGap(m){if(m<60)return m+" min";const h=Math.floor(m/60),mm=m%60;return mm?h+"h "+mm+"m":h+"h";}
function normDayMin(t){let m=timeToMinutes(t);if(m==null)return null;if(m<360)m+=1440;return m;}
function ProposalDay({date,shows}){
  const items=(shows||[]).filter(s=>s.start).map(s=>{const sm=normDayMin(s.start);let em=normDayMin(s.end);if(em==null||em<=sm)em=sm+60;return {...s,_s:sm,_e:em};}).sort((a,b)=>a._s-b._s);
  const st=proposalStats(shows);
  const dl=date?(()=>{const d=new Date(date+"T12:00:00");return `${DAYS_FULL[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;})():"Pick a day";
  const summary=(<div style={{fontSize:13,color:TXT2,marginBottom:12,padding:"10px 12px",borderRadius:10,background:"rgba(255,255,255,0.05)",fontWeight:600,lineHeight:1.5,textAlign:"center"}}><span style={{color:TXT,fontWeight:800}}>{dl}</span> · starts <span style={{color:TXT,fontWeight:800}}>{fmtMin(st.startMin)}</span> · ends <span style={{color:TXT,fontWeight:800}}>{fmtMin(st.endMin)}</span> · costs <span style={{color:TXT,fontWeight:800}}>£{st.cost.toFixed(2)}</span></div>);
  if(items.length===0)return <div>{summary}<div style={{fontSize:13,color:TXT3,textAlign:"center",padding:"14px"}}>No shows with times yet.</div></div>;
  const minS=Math.min(...items.map(i=>i._s)),maxE=Math.max(...items.map(i=>i._e));
  const startH=Math.floor(minS/60),endH=Math.ceil(maxE/60),HOUR=86,rangeTop=startH*60,gh=(endH-startH)*HOUR;
  const lanes=[];items.forEach(it=>{let placed=false;for(let li=0;li<lanes.length;li++){if(lanes[li][lanes[li].length-1]._e<=it._s){lanes[li].push(it);it._lane=li;placed=true;break;}}if(!placed){it._lane=lanes.length;lanes.push([it]);}});
  const nLanes=Math.max(1,lanes.length);
  items.forEach(it=>{it._ov=items.some(o=>o!==it&&o._s<it._e&&it._s<o._e);});
  const travels=[];for(let k=1;k<items.length;k++){const a=items[k-1],b=items[k];const gap=b._s-a._e;if(gap<0)continue;const need=requiredGapMin(a,b);const w=walkMinutes(a,b);travels.push({top:(a._e-rangeTop)/60*HOUR,h:Math.max(18,gap/60*HOUR-2),ok:gap>=need,gap,need,w});}
  return (<div>
    {summary}
    <div style={{display:"flex",background:"rgba(255,255,255,0.02)",borderRadius:12,border:`1px solid ${CARD_BORDER}`,overflowY:"auto",overflowX:"hidden",maxHeight:"min(1290px, calc(100vh - 170px))"}}>
      <div style={{width:46,flexShrink:0,position:"relative",height:gh}}>
        {Array.from({length:endH-startH+1},(_,i)=>(<div key={i} style={{position:"absolute",top:i*HOUR-6,right:6,fontSize:11,color:TXT2,fontWeight:600}}>{formatHour(((startH+i)%24)*60)}</div>))}
      </div>
      <div style={{flex:1,position:"relative",height:gh,borderLeft:`1px solid ${CARD_BORDER}`}}>
        {Array.from({length:endH-startH},(_,i)=>(<div key={i} style={{position:"absolute",top:i*HOUR,left:0,right:0,height:1,background:"rgba(255,255,255,0.06)"}}/>))}
        {travels.map((t,i)=>(<div key={"t"+i} style={{position:"absolute",top:t.top+1,height:t.h,left:2,right:2,borderRadius:6,zIndex:1,background:t.ok?"rgba(52,211,153,0.14)":"rgba(239,68,68,0.16)",border:`1px dashed ${t.ok?"#34D399":"#EF4444"}`,display:"flex",alignItems:"center",justifyContent:"center",gap:5,overflow:"hidden",fontSize:11,fontWeight:700,color:t.ok?"#34D399":"#EF4444",padding:"0 6px",textAlign:"center"}}>🚶 {t.w!=null?`${t.w} min walk`:"walk"} · {t.gap} min gap{t.ok?"":` · too tight, need ${t.need}`}</div>))}
        {items.map((it,k)=>{const top=(it._s-rangeTop)/60*HOUR;const bh=Math.max(50,(it._e-it._s)/60*HOUR-2);const w=100/nLanes;const col=gc2(it.organiser).bg;const proposed=!it.booked;return(
          <div key={k} title={it.fullAddress||it.address||it.venue||""} style={{position:"absolute",top,height:bh,left:`calc(${it._lane*w}% + 3px)`,width:`calc(${w}% - 6px)`,background:col,opacity:proposed?1:0.4,borderRadius:8,padding:"5px 8px",overflow:"hidden",color:"#fff",boxSizing:"border-box",zIndex:2,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:6,boxShadow:it._ov?"0 0 0 2px #EF4444":"none",border:proposed?"none":"1px dashed rgba(255,255,255,0.6)"}}>
            <div style={{minWidth:0,flex:1}}>
              <div style={{fontSize:13,fontWeight:700,lineHeight:1.2,wordBreak:"break-word"}}>{it.name}</div>
              <GenrePills show={it} dark/>
              <div style={{fontSize:14,fontWeight:600,opacity:0.9,whiteSpace:"nowrap"}}>{formatTime(it.start)}{proposed?"":" · booked"}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
              {it.price&&<span style={{fontSize:15,fontWeight:800,whiteSpace:"nowrap"}}>{it.price}</span>}
              {it.link&&<a href={it.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} title="Open show page" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:24,height:24,borderRadius:7,background:"#fff",color:col,textDecoration:"none",flexShrink:0,boxShadow:"0 1px 4px rgba(0,0,0,0.35)"}}><OpenIcon/></a>}
            </div>
          </div>);})}
      </div>
    </div>
    <div style={{marginTop:10,fontSize:12,color:TXT2,lineHeight:1.5}}>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:5}}>
        <span style={{display:"inline-flex",alignItems:"center",gap:5}}><span style={{width:11,height:11,borderRadius:3,background:"#A855F7",display:"inline-block"}}/>Shows you're proposing</span>
        <span style={{display:"inline-flex",alignItems:"center",gap:5}}><span style={{width:11,height:11,borderRadius:3,background:"#A855F7",opacity:0.4,display:"inline-block"}}/>Already booked</span>
      </div>
      <div style={{color:TXT3}}>The bars between shows show whether there's time to get from one venue to the next — <span style={{color:"#34D399",fontWeight:700}}>green</span> means you're fine, <span style={{color:"#EF4444",fontWeight:700}}>red</span> means it's too tight. Tap the ↗ on any show to open its page.</div>
    </div>
  </div>);
}
const INTERESTS=[
  {v:"high",label:"Really interested",color:"#FFBA08",icon:"star"},
  {v:"maybe",label:"Don't mind",color:"#94A3B8",icon:"dash"},
  {v:"no",label:"Not interested",color:"#EF4444",icon:"x"},
];
function InterestIcon({kind,size=16}){
  const svg={
    star:<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>,
    dash:<rect x="3" y="7" width="10" height="2" rx="1"/>,
    x:<path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" style={{display:"block"}}>{svg[kind]}</svg>;
}
const VENUE_GEO={"547":[55.93909,-3.23235,"Tynecastle Park"],"188":[55.94494,-3.19967,"Novotel"],"636":[55.94455,-3.18748,"Outside Appleton Tower, Crichton St"],"199":[55.95028,-3.19021,"Edinburgh City Chambers (Meeting Point)"],"238":[55.92691,-3.15372,"Meeting Point at Bridgend Farmhouse"],"84":[55.92891,-3.19481,"Royal College of Nursing Scotland"],"127b":[55.95004,-3.20606,"St Johns – West End Fair"],"508":[55.94809,-3.19338,"Greyfriars Hall at Virgin Hotels Edinburgh"],"376":[55.91872,-3.16654,"Krua Thai Cookery School"],"275":[55.95811,-3.18737,"Vegan Tipples"],"259":[55.9546,-3.19803,"Laughing Horse @ The Hanover Tap"],"86":[55.95623,-3.18744,"St Mary's Catholic Cathedral"],"328":[55.94282,-3.21025,"Lochrin Rooftop Bar"],"436":[55.97127,-3.27773,"Lauriston Castle"],"127":[55.95014,-3.20601,"St John's Church"],"425":[55.9656,-3.19303,"Beaverhall Art Studios"],"264":[55.97545,-3.18028,"Art Glass Studio 34"],"488":[55.94816,-3.19217,"The Magdalen Chapel"],"183":[55.97399,-3.17225,"The Scotch Malt Whisky Society - The Vaults"],"451":[55.95142,-3.17849,"Outside Scottish Poetry Library"],"562":[55.9591,-3.19713,"The Cumberland Bar"],"118":[55.95724,-3.17034,"Ginger Twist Studio"],"272a":[55.94899,-3.18973,"The Three Sisters"],"113":[55.97073,-3.20887,"St James Goldenacre"],"301d":[55.94834,-3.18748,"Just the Tonic at La Belle Angele"],"521":[55.94152,-3.14742,"Dr Neil's Garden"],"262":[55.95973,-3.19048,"Mansfield Traquair Centre"],"163":[55.94533,-3.20121,"Sacred Heart Church"],"437b":[55.94827,-3.19152,"Sneaky Pete's"],"117":[55.93521,-3.17815,"Duncan Street Baptist Church"],"646":[55.9508,-3.18589,"Museum of Magic, Fortune-Telling and Witchcraft"],"560":[55.94627,-3.20638,"Scott Lawrie Gallery"],"289":[55.94785,-3.19144,"Laughing Horse @ Dropkick Murphys"],"116":[55.95178,-3.20766,"Meeting Point at Charlotte Square"],"66":[55.952,-3.22422,"Modern"],"230":[55.95899,-3.22524,"St Ninian's Hall"],"114":[55.95069,-3.21343,"Library of Mistakes"],"503":[55.95494,-3.18907,"The Stand at W Edinburgh"],"478":[55.95079,-3.20529,"Statue of Sir James Young Simpson"],"209a":[55.94572,-3.18551,"Nicolson Square Venues"],"95":[55.94371,-3.2025,"St Michael and All Saints"],"314":[55.95512,-3.19678,"Physicians' Gallery"],"149":[55.95938,-3.21215,"Galerie Mirages"],"336":[55.95828,-3.20658,"ætla Fine Jewellery"],"359":[55.9513,-3.18949,"Fruitmarket"],"68":[55.95367,-3.19063,"The Voodoo Rooms"],"610":[55.9554,-3.18987,"Bonnie & Wild's Scottish Marketplace"],"246":[55.95056,-3.18643,"WHISKI Bar & Restaurant"],"256":[55.9563,-3.19888,"The Dundas Street Gallery"],"295b":[55.94312,-3.20528,"Central Hall"],"190":[55.93464,-3.21034,"Christ Church Morningside"],"240":[55.97644,-3.17113,"Cyan Clayworks CIC"],"245":[55.95077,-3.18252,"Cask and Vine"],"541":[55.97738,-3.17529,"Citadel Youth Centre"],"346":[55.9567,-3.18878,"Ps & Gs Church"],"454":[55.94814,-3.19282,"Eve"],"267":[55.95119,-3.18712,"Old Saint Paul's Church"],"308":[55.95656,-3.1991,"The Scottish Gallery"],"166":[55.95857,-3.20349,"Saint Stephen's Theatre"],"122":[55.94948,-3.20546,"St Cuthbert's Church"],"472":[55.94302,-3.17753,"Holyrood Distillery"],"353":[55.97999,-3.1796,"The Wee Museum of Memory"],"374":[55.98085,-3.17788,"Ocean Terminal"],"179":[55.94736,-3.19,"National Museum of Scotland"],"325":[55.94948,-3.18965,"The Pend"],"607":[55.95916,-3.2061,"Patriothall"],"100":[55.94881,-3.18605,"PBH's Free Fringe @ Pilgrim"],"228":[55.95731,-3.18764,"Keller Taproom"],"135":[55.95999,-3.2062,"Stockbridge Ceramics"],"626":[55.96952,-3.17313,"The Mother Superior"],"335":[55.94945,-3.19363,"Gladstone's Land"],"502":[55.95381,-3.18935,"National Records of Scotland"],"515b":[55.94938,-3.18782,"Meeting Point Outside of Monkey Barrel Comedy"],"241c":[55.95651,-3.19742,"The Royal Scots Club Edinburgh"],"5":[55.95587,-3.19215,"The Stand Comedy Club"],"583":[55.94662,-3.18795,"Meeting Point @ Potterrow Underpass (Lothian Street Side)"],"133":[55.95871,-3.18901,"Shop With No Name"],"239":[55.95681,-3.18774,"PBH's Free Fringe @ The Street"],"310":[55.94876,-3.20965,"Scottish Arts Club"],"446":[55.97731,-3.24498,"PASS Theatre"],"324":[55.96886,-3.17227,"Leith Arches"],"160":[55.96388,-3.1763,"PBH's Free Fringe @ Strathmore Bar"],"189":[55.94711,-3.20659,"Theatre Big Top"],"120":[55.96894,-3.17301,"Leith Makers"],"124":[55.95027,-3.18366,"Scottish Textiles Showcase"],"13":[55.95233,-3.17806,"Venue 13"],"168":[55.94931,-3.19233,"French Institute in Scotland"],"83":[55.97206,-3.20501,"Inverleith St Serf's Church Centre"],"99a":[55.9574,-3.18697,"Outhouse Bar"],"67":[55.95851,-3.18354,"Valvona & Crolla"],"11":[55.93314,-3.17713,"Newington Trinity Church"],"567":[55.95247,-3.20512,"Tigerlily"],"433":[55.94994,-3.18346,"Lily Luna Edinburgh Jewellery Boutique"],"293":[55.93825,-3.19149,"Argyle Cellar Bar"],"511":[55.95199,-3.17519,"The Scottish Parliament"],"187":[55.94966,-3.19084,"St Giles' Cathedral"],"217":[55.94687,-3.1914,"Outside Greyfriars Bobby Bar"],"138":[55.95693,-3.17875,"Ukrainian Community Centre"],"574":[55.94501,-3.1866,"Inspace"],"91":[55.94862,-3.21657,"St Mary's Episcopal Cathedral"],"130":[55.95776,-3.20135,"Edinburgh Photographic Society"],"580":[55.93001,-3.29923,"Hope City Church Edinburgh"],"364":[55.94659,-3.18577,"Outside Edinburgh's Festival Theatre (Next to the Festival Theatre Cafe side door)"],"207":[55.95065,-3.18877,"Meeting Point at Cockburn St, Corner of Fleshmarket Close"],"357a":[55.94882,-3.18655,"Bannermans"],"589":[55.93428,-3.19342,"Blackford and Grange"],"405":[55.94808,-3.18249,"The Salvation Army Edinburgh City Corps"],"60":[55.95151,-3.17932,"Canongate Kirk"],"524":[55.95834,-3.21296,"LifeCare Centre"],"412":[55.9426,-3.2199,"St Bride's Community Centre"],"305":[55.95225,-3.1784,"Panmure House"],"70":[55.96032,-3.20355,"The Edinburgh Academy"],"125":[55.94856,-3.20543,"artSpace@StMarks"],"311":[55.93722,-3.2067,"Traverse – Elsewhere"],"342":[55.94848,-3.1878,"Stramash"],"214":[55.96836,-3.17403,"Leith Depot"],"80":[55.94894,-3.18661,"Monkey Barrel Comedy (Niddry Street)"],"25":[55.94818,-3.19155,"Just The Tonic at Westside Rodeo"],"42":[55.96272,-3.19827,"Canonmills Church"],"77":[55.94885,-3.18649,"St Cecilia's Hall"],"257":[55.94458,-3.18539,"Laughing Horse @ The Pear Tree"],"48":[55.94509,-3.18587,"Edinburgh Central Mosque"],"131":[55.94678,-3.19222,"Greyfriars Kirk"],"422":[55.94487,-3.18696,"University of Edinburgh Informatics Forum"],"28":[55.94682,-3.19515,"Pleasance Grassmarket"],"106":[55.94229,-3.2025,"Laughing Horse @ Home Bar"],"235":[55.93393,-3.20977,"Eric Liddell Community"],"218":[55.96047,-3.28985,"Munro Community Centre"],"254":[55.94727,-3.21585,"Palmerston Place Church"],"72":[55.94128,-3.18148,"The Queen's Hall"],"237":[55.94394,-3.18197,"Alba Flamenca"],"57":[55.94796,-3.18703,"The Jazz Bar"],"324b":[55.96895,-3.17253,"Pleasance Pop Up: Leith Arches"],"59":[55.95735,-3.18533,"Edinburgh Playhouse"],"107":[55.96416,-3.17776,"Laughing Horse @ Brass Monkey Leith"],"410":[55.94994,-3.20783,"Ghillie Dhu"],"252":[55.95003,-3.18938,"Meeting Point at High Street Wellhead"],"195":[55.96483,-3.17418,"Out of the Blue Drill Hall"],"486":[55.95571,-3.15238,"ScotArt – St. Margaret’s House"],"359a":[55.9513,-3.18949,"Teatro Fisico"],"331":[55.95854,-3.18644,"Santu Coffee Roastery"],"396":[55.95512,-3.19574,"WU"],"471a":[55.95523,-3.19557,"The Stand at Edinburgh Food & Drink Academy"],"593":[55.94691,-3.20444,"Traverse @ The Lyceum Studio"],"4":[55.94991,-3.1895,"C ARTS | C venues | C digital"],"132":[55.94476,-3.18547,"Lighthouse – Edinburgh's Radical Bookshop"],"572":[55.95397,-3.20614,"YOTEL Edinburgh"],"282":[55.95625,-3.15642,"Meadowbank Sports Centre"],"315":[55.95079,-3.17465,"Dynamic Earth"],"111":[55.95392,-3.19577,"Edinburgh New Town Church"],"298":[55.9425,-3.19009,"Meeting Point at Uplands Roast Coffee Shop"],"10":[55.94976,-3.19019,"Mercat Cross, Parliament Square"],"194":[55.95247,-3.20041,"Laughing Horse @ Freddy's"],"216":[55.94154,-3.17174,"Meeting Point at Holyrood Park entrance on Holyrood Park Road"],"162":[55.97573,-3.18031,"EIFF @ Leith Theatre"],"27":[55.94814,-3.19163,"Just The Tonic at Subway"],"309":[55.94803,-3.18588,"The Royal Oak"],"40":[55.94877,-3.19366,"C ARTS | C venues | C alto"],"75":[55.9464,-3.19898,"Laughing Horse @ West Port Oracle"],"414":[55.94639,-3.1995,"Laughing Horse @ Dragonfly"],"498":[55.95731,-3.18967,"Deaf Action"],"367":[55.94832,-3.19551,"St Columba's by the Castle Scottish Episcopal Church"],"90":[55.95122,-3.18915,"Brewhemia"],"421":[55.95554,-3.1936,"Portrait"],"445":[55.95121,-3.18839,"The Stand at The Scotsman"],"78a":[55.95083,-3.18242,"Canons' Gait"],"272":[55.94824,-3.19019,"Laughing Horse @ The Three Sisters"],"611":[55.9436,-3.17821,"Tipsy Midgie"],"222":[55.95093,-3.19569,"National"],"455":[55.95313,-3.1865,"The Melting Pot"],"277":[55.93597,-3.13173,"Artspace"],"29":[55.94773,-3.19126,"Paradise in The Vault"],"442":[55.94467,-3.18513,"Laughing Horse @ West Nic Records"],"171":[55.95704,-3.18509,"PBH's Free Fringe @ CC Blooms"],"448":[55.95229,-3.17686,"The Parliament Arms"],"301e":[55.94854,-3.18756,"La Belle Angele, Sneaky Pete's and Bannerman's Bar"],"147":[55.94869,-3.19196,"National Library of Scotland"],"153":[55.94733,-3.18523,"Laughing Horse @ The Brass Monkey"],"352":[55.94658,-3.20608,"EIFF @ Filmhouse"],"155":[55.94131,-3.21827,"EIFF @ Cineworld"],"202":[55.94281,-3.20378,"EIFF @ The Cameo"],"197":[55.95822,-3.20353,"St Vincent's"],"318":[55.96063,-3.2216,"Broughton High School"],"605":[55.94938,-3.18724,"PBH's Free Fringe @ Greek Gyros Grill"],"89":[55.94797,-3.19307,"Laughing Horse @ Kick Ass Cowgate"],"241a":[55.95647,-3.19778,"The Speakeasy at The Royal Scots Club"],"203":[55.95147,-3.17809,"Scottish Poetry Library"],"303":[55.95234,-3.20552,"Laughing Horse @ Coco Boho"],"104":[55.959,-3.17918,"The Bakery"],"306":[55.93509,-3.19495,"Woolkind HQ"],"151":[55.9491,-3.18601,"Laughing Horse @ Bar 50"],"169":[55.94978,-3.18803,"Old Merchants' Hall @ The Piper's Rest"],"276a":[55.94855,-3.1936,"The Liquid Room"],"221":[55.9541,-3.20087,"PBH's Free Fringe @ Fingers Piano Bar"],"226":[55.95288,-3.20226,"Contini George Street"],"248":[55.95081,-3.20577,"Coyote Ugly Edinburgh"],"198":[55.94809,-3.1853,"Dovecot Studios"],"471":[55.95523,-3.19557,"Edinburgh Food & Drink Academy"],"61":[55.94816,-3.19229,"Underbelly, Cowgate"],"209":[55.9456,-3.18592,"Nicolson Square Venues"],"182":[55.9545,-3.19964,"The Scotch Malt Whisky Society - Queen Street"],"332":[55.94521,-3.20492,"Laughing Horse @ The Raging Bull"],"301":[55.94874,-3.18751,"La Belle Angele"],"276":[55.94855,-3.19356,"PBH's Free Fringe @ Liquid Room"],"35":[55.94981,-3.19528,"Assembly Hall"],"141":[55.97542,-3.16714,"PBH's Free Fringe @ Diggers Leith"],"17":[55.94351,-3.18684,"Assembly George Square Studios"],"15":[55.94762,-3.20484,"Traverse Theatre"],"49":[55.94629,-3.19072,"Bedlam Theatre"],"515a":[55.94938,-3.18782,"EIFF @ Monkey Barrel Comedy"],"243":[55.94669,-3.1879,"Hoots @ Potterrow"],"295a":[55.94394,-3.20425,"EIFF @ Tollcross Central Hall"],"357":[55.94882,-3.18655,"PBH's Free Fringe @ Bannermans"],"329":[55.96026,-3.19341,"Broughton St Mary’s Parish Church"],"438b":[55.95046,-3.18424,"Scottish Comedy Festival @ Waverley Bar"],"178a":[55.94738,-3.19689,"Scottish Comedy Festival @ The Beehive Inn"],"317":[55.96014,-3.20666,"Stockbridge Church"],"170":[55.94468,-3.18512,"Laughing Horse @ The Counting House"],"640":[55.94948,-3.18562,"PBH's Free Fringe @ Slow Progress Cafe and Records"],"115":[55.94851,-3.19225,"Necrobus"],"5b":[55.95587,-3.19215,"The Stand Comedy Club 2"],"82":[55.94426,-3.18396,"ZOO Southside"],"241":[55.95644,-3.19793,"The Royal Scots Club"],"322":[55.94623,-3.18999,"Shedinburgh @ Assembly Checkpoint"],"108":[55.94709,-3.19667,"Hoots @ The Apex"],"39":[55.95017,-3.18689,"theSpace on the Mile"],"504":[55.95387,-3.18823,"Jackson the Tailor"],"389":[55.95432,-3.18871,"Alchemist | St James Quarter"],"152":[55.94755,-3.19158,"Paradise in Augustines"],"45":[55.95121,-3.18709,"theSpace @ Venue 45"],"41":[55.95355,-3.20285,"Braw Venues @ Hill Street"],"393":[55.94564,-3.18069,"Just The Tonic Nucleus"],"3":[55.94342,-3.18707,"Assembly George Square Gardens"],"44":[55.94629,-3.18924,"The Gilded Saloon"],"474":[55.97533,-3.16731,"Nobles by Bellfield"],"300":[55.94318,-3.18955,"Underbelly, George Square"],"304":[55.94736,-3.19166,"Frankenstein Pub"],"64":[55.94657,-3.18859,"Gilded Balloon at the Museum"],"23":[55.94602,-3.18841,"Pleasance Dome"],"24":[55.94804,-3.18732,"Gilded Balloon Patter House"],"14":[55.94512,-3.18861,"Gilded Balloon Teviot"],"22":[55.94748,-3.19704,"Assembly @ Dance Base"],"409":[55.95342,-3.19888,"Alchemist Cocktail Bar and Restaurant"],"150b":[55.94585,-3.2098,"Pleasance at EICC"],"136":[55.9419,-3.20287,"Gilded Balloon at the King's Theatre"],"274":[55.95979,-3.27797,"Barnton Bunker"],"224":[55.95179,-3.19639,"The Scottish Cafe & Restaurant"],"65":[55.94531,-3.19374,"Rotunda Theatre"],"8":[55.9444,-3.18778,"Assembly George Square"],"88":[55.94862,-3.18641,"Just The Tonic at The Caves"],"9":[55.94979,-3.18684,"theSpace @ Niddry St"],"21":[55.94873,-3.19441,"C ARTS | C venues | C aquila"],"6":[55.94529,-3.20136,"C ARTS | C venues | C aurora"],"128":[55.95305,-3.19575,"Manahatta"],"186":[55.94874,-3.18428,"ZOO Playground"],"302":[55.94553,-3.18893,"Underbelly, Bristo Square"],"7":[55.95249,-3.20255,"Braw Venues @ Grand Lodge"],"288":[55.94852,-3.18706,"Just The Tonic at The Mash House"],"99":[55.95747,-3.18678,"PBH's Free Fringe @ The Outhouse Bar"],"232":[55.94875,-3.18718,"PBH's Free Fringe @ SUPERCUBE Cowgate"],"26":[55.9399,-3.18234,"Summerhall"],"650":[55.95486,-3.19807,"Laughing Horse @ Boston Bar (New Town)"],"12":[55.95635,-3.19052,"The Stand Comedy Club 3 & 4"],"148":[55.94532,-3.18371,"PBH's Free Fringe @ Southsider"],"158":[55.94994,-3.18725,"PBH's Free Fringe @ Whistlebinkies"],"220":[55.95983,-3.17139,"PBH's Free Fringe @ Pizza Geeks Easter Road"],"154":[55.95765,-3.17085,"PBH's Free Fringe @ The Tailor Cafe and Wine Bar"],"78":[55.95083,-3.18242,"PBH's Free Fringe @ Canons' Gait"],"55":[55.97653,-3.17119,"PBH's Free Fringe @ 3 Old Monks"],"603":[55.95124,-3.18256,"PBH's Free Fringe @ BrewDog Doghouse Hotel"],"38":[55.94607,-3.18506,"theSpaceTriplex"],"43":[55.94671,-3.18411,"theSpace @ Symposium Hall"],"94":[55.94974,-3.187,"Just The Tonic at The Hive"],"244":[55.9531,-3.19922,"PBH's Free Fringe @ SUPERCUBE George Street"],"30":[55.95059,-3.18506,"Scottish Storytelling Centre"],"156":[55.9494,-3.18684,"PBH's Free Fringe @ Banshee Labyrinth"],"16":[55.94922,-3.1936,"Greenside @ Riddles Court"],"320":[55.97752,-3.16907,"Brown's of Leith"],"142":[55.9601,-3.18309,"PBH's Free Fringe @ Central Youth Hostel"],"53":[55.94668,-3.18554,"theSpace @ Surgeons' Hall"],"515":[55.94938,-3.18782,"Monkey Barrel Comedy"],"85":[55.94924,-3.18773,"Laughing Horse @ City Cafe"],"236":[55.95355,-3.19657,"Greenside @ George Street"],"139":[55.94745,-3.18427,"Assembly Roxy"],"63":[55.94556,-3.18612,"Hoots @ Nicolson Square"],"102":[55.94771,-3.20693,"PBH's Free Fringe @ BrewDog Lothian Rd"],"506":[55.94617,-3.19791,"Hoots @ The Wee Red Bar"],"157":[55.94993,-3.18816,"City of Edinburgh Tours @ Old Police Box"],"47":[55.95349,-3.19586,"Le Monde"],"20":[55.95317,-3.19879,"Assembly Rooms"],"180":[55.94874,-3.18717,"PBH's Free Fringe @ Carbon"],"33":[55.94774,-3.18193,"Pleasance Courtyard"],"360":[55.94095,-3.19017,"Underbelly’s Circus Hub on the Meadows"],"68b":[55.95367,-3.19061,"PBH's Free Fringe @ Voodoo Rooms"],"31":[55.94576,-3.20414,"Hoots @ Hilton (Bread Street)"],"338":[55.94901,-3.1871,"Monkey Barrel Comedy (Cabaret Voltaire)"],"290":[55.94927,-3.21793,"Arthur Conan Doyle Centre"],"345":[55.95043,-3.21734,"Edinburgh Thistle Hotel"],"2":[55.94787,-3.18542,"Fringe Central"],"453":[55.94975,-3.19335,"The Castle Rock Cafe"],"51a":[55.94975,-3.18763,"Monkey Barrel Comedy at O'Neill's (The Tron)"],"344":[55.93705,-3.21122,"Pianodrome at St Oswald's Centre"],"172":[55.9541,-3.1918,"Bijou at Assembly @ St Andrew Square"]};
function loadLeaflet(){if(typeof window==="undefined")return Promise.reject();if(window.L)return Promise.resolve(window.L);if(window._llp)return window._llp;window._llp=new Promise((res,rej)=>{const css=document.createElement("link");css.rel="stylesheet";css.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(css);const js=document.createElement("script");js.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";js.onload=()=>res(window.L);js.onerror=rej;document.head.appendChild(js);});return window._llp;}
function genresOf(s){return String((s&&s.genres)||"").split("|").map(x=>x.trim()).filter(Boolean);}
function GenrePills({show,dark}){const gs=genresOf(show);if(!gs.length)return null;return <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:5}}>{gs.map((g,i)=>(<span key={i} style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:6,lineHeight:1.3,background:dark?"rgba(255,255,255,0.22)":"rgba(168,85,247,0.16)",color:dark?"#fff":"#C084FC"}}>{g}</span>))}</div>;}
function ShowCard({show,onClick,review,onRate,wishlist,interest,onInterest,tags,onAddTag,onRemoveTag}){
  const c=gc2(show.organiser);const pc=extractPostcode(show.address);
  const [reviewOpen,setReviewOpen]=useState(false);
  const chosen=RATINGS.find(r=>r.v===review);
  const [interestOpen,setInterestOpen]=useState(false);
  const chosenInterest=INTERESTS.find(x=>x.v===interest);
  const [tagAdding,setTagAdding]=useState(false);
  const [tagInput,setTagInput]=useState("");
  return(
    <div onClick={onClick} style={{display:"flex",alignItems:"stretch",cursor:"pointer",borderRadius:14,overflow:"hidden",background:CARD,border:`1px solid ${CARD_BORDER}`,marginLeft:8,marginRight:8,backdropFilter:"blur(8px)",transition:"transform 0.15s"}}>
      <div style={{width:4,background:c.bg,flexShrink:0}}/>
      <div style={{flex:1,padding:"10px 14px",minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
          <div style={{minWidth:0}}>
            <div style={{fontSize:16,fontWeight:700,color:TXT,lineHeight:1.3}}>
              {show.name}{!show.booked&&<span style={{marginLeft:6,fontSize:10,background:"rgba(251,146,60,0.15)",color:"#FB923C",padding:"2px 6px",borderRadius:4,fontWeight:700}}>unbooked</span>}
              {show.ltf&&<span style={{marginLeft:6,fontSize:10,background:"rgba(255,186,8,0.2)",color:"#FFBA08",padding:"2px 6px",borderRadius:4,fontWeight:700}}>LTF</span>}
            </div>
            <div style={{fontSize:13,color:TXT2,marginTop:3}}>
              {show.venue}{show.venueCode?<span style={{color:TXT3}}> · Venue {show.venueCode}</span>:null}
              {show.availability&&<> · <span style={{fontWeight:600,color:show.availability==="Sold Out"?"#EF4444":show.availability==="Limited"?"#FB923C":show.availability==="Available"?"#34D399":TXT2}}>{show.availability}</span></>}
            </div>
            {(show.fullAddress||show.address)&&<div style={{fontSize:12,color:TXT2,marginTop:3}}><span style={{fontSize:16,filter:"saturate(1.4) brightness(1.15)",verticalAlign:"-2px"}}>📍</span> <a href={mapsUrl(show)} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{color:"#60A5FA",fontWeight:600}}>{show.fullAddress||show.address}</a></div>}
            <GenrePills show={show}/>
          </div>
          <div style={{textAlign:"right",flexShrink:0,maxWidth:"46%"}}>
            <div style={{fontSize:18,fontWeight:800,color:timeBucketColor(show.start)||TXT}}>{formatTime(show.start)}</div>
            <div style={{fontSize:12,color:TXT2}}>{show.duration}</div>
            {show.attendees&&<div style={{display:"flex",gap:4,marginTop:8,flexWrap:"wrap",justifyContent:"flex-end"}}>{show.attendees.split(",").map((p,pi)=>(<span key={pi} style={{display:"inline-flex",alignItems:"center",gap:3,background:"rgba(255,255,255,0.07)",color:TXT2,padding:"2px 8px",borderRadius:10,fontSize:13,fontWeight:600}}><UserIcon/>{p.trim()}</span>))}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function gc2(org){return OC[org]||{bg:"#64748B",glow:"rgba(100,116,139,0.3)"};}

function MultiDrop({open,onToggle,label,icon,options,selected,onSelect,onClear,accent="#93C5FD"}){
  const n=selected.length;
  return (
    <div style={{position:"relative"}}>
      <button onClick={onToggle} style={{padding:"7px 14px",borderRadius:20,border:`1px solid ${CARD_BORDER}`,fontSize:13,fontWeight:700,cursor:"pointer",background:n?accent+"22":"rgba(255,255,255,0.06)",color:n?accent:TXT,display:"inline-flex",alignItems:"center",gap:6}}>{icon&&<span>{icon}</span>}{n?label+" ("+n+")":label} ▾</button>
      {open&&(<div style={{position:"absolute",top:"calc(100% + 6px)",left:0,zIndex:60,background:"var(--card-solid)",border:`1px solid ${CARD_BORDER}`,borderRadius:12,padding:6,minWidth:180,maxHeight:280,overflowY:"auto",boxShadow:"0 10px 30px rgba(0,0,0,0.6)"}}>
        {n>0&&<div onClick={onClear} style={{fontSize:12,color:accent,fontWeight:700,padding:"5px 8px",cursor:"pointer"}}>Clear all</div>}
        {options.length===0&&<div style={{fontSize:12,color:TXT3,padding:"7px 8px",whiteSpace:"nowrap"}}>Nothing to filter yet</div>}
        {options.map(opt=>(<label key={opt.value} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 8px",cursor:"pointer",fontSize:13,color:TXT,borderRadius:8,background:selected.includes(opt.value)?accent+"26":"transparent"}}><input type="checkbox" checked={selected.includes(opt.value)} onChange={()=>onSelect(opt.value)} style={{accentColor:accent}}/>{opt.dot&&<span style={{width:9,height:9,borderRadius:3,background:opt.dot,display:"inline-block",flexShrink:0}}/>}{opt.label}</label>))}
      </div>)}
    </div>
  );
}
function TabBtn({active,onClick,children,accent}){
  return <button onClick={onClick} style={{padding:"8px 20px",borderRadius:24,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"0.3px",background:active?"rgba(255,255,255,0.14)":"transparent",color:active?"#fff":TXT2,transition:"all 0.15s"}}>{children}</button>;
}
function Chip({a,o,children,c}){
  const bg=c||"#FF4D6A";
  return <button onClick={o} style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${a?bg:CARD_BORDER}`,fontSize:12,fontWeight:700,cursor:"pointer",background:a?bg:"transparent",color:a?"#fff":TXT2,transition:"all 0.15s"}}>{children}</button>;
}
function TimeBtn({a,o,children,e}){
  return <button onClick={o} style={{padding:"6px 12px",borderRadius:12,border:`1px solid ${a?"#FF4D6A":CARD_BORDER}`,fontSize:12,fontWeight:700,cursor:"pointer",background:a?"#FF4D6A":"transparent",color:a?"#fff":TXT2,display:"flex",alignItems:"center",gap:4}}>{e&&<span style={{fontSize:14}}>{e}</span>}{children}</button>;
}
function NavBtn({disabled,onClick,children}){
  return <button onClick={onClick} disabled={disabled} style={{background:disabled?"rgba(255,255,255,0.05)":ACCENT,border:"none",fontSize:18,fontWeight:700,cursor:disabled?"default":"pointer",opacity:disabled?0.3:1,padding:0,color:"#fff",width:42,height:42,borderRadius:21,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:disabled?"none":"0 4px 16px rgba(168,85,247,0.3)"}}>{children}</button>;
}
function Dt({l,children}){
  return <div><div style={{fontSize:12,color:TXT3,marginBottom:2,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>{l}</div><div style={{fontWeight:600,color:TXT}}>{children}</div></div>;
}

export default function FringeCalendar(){
  return <ErrorBoundary><FringeCalendarInner/></ErrorBoundary>;
}
