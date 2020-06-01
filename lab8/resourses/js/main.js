const req = new XMLHttpRequest();
const base = "https://cloud.iexapis.com/v1/stock/market/batch";

query = new URLSearchParams ({ 
     "symbols" : [
        "AAPL",
        "ABM",
        "TSLA",
        "INTC",
        "F-C",
        "AMD",
        "ATVI",
        "PYPL",
        "AMNB"
    ],
     "filter" : [
        "symbol",
        "companyName",
        "latestPrice",
        "previousClose"
    ],
     "types" : ["quote"], 
     "token" : ''
});


function buildUrl(path, query) {
    return path + "?" + query.toString();
}

let time = Date.now();
function build(columns, inputData) {
    "use strict";
    $("#grid").jqGrid({
        colModel: [
            { name: "symbol" },
            { name: "companyName" },
            { name: "latestPrice" },
            { name: "previousClose" }
        ],
        data : inputData
    });
};

function update(data) {
    var rows = jQuery("#grid").getDataIDs();
    for(a=0;a<rows.length;a++) {
        row=jQuery("#grid").getRowData(rows[a]);
        row.latestPrice = data[a].latestPrice;
        row.previousClose -= data[a].latestPrice;
        row.previousClose = row.previousClose.toFixed(2);
    }
    $('#grid').trigger( 'reloadGrid' );
    time = Date.now()
}

function getData(response) {
    let data = [];

    for (let [key, value] of Object.entries(response)){
        value.quote.previousClose -= value.quote.latestPrice;
        value.quote.previousClose = value.quote.previousClose.toFixed(2);
        data.push(value.quote);
    } 

    return data;
}

req.open('GET', buildUrl(base, query));
req.onreadystatechange = function() {
    if (req.readyState === 4 && req.status === 200) {
        let data = getData(JSON.parse(req.responseText))
        build(Object.keys(data[0]), data);
    }
}
req.send('');


query.set("filter", ["latestPrice", "latestUpdate"])
update_url = buildUrl(base, query)
rxjs.interval(20000).subscribe( () => 
{
    req.open('GET', update_url);
	req.onreadystatechange = function() {
		if (req.readyState === 4 && req.status === 200) {
            let data = getData(JSON.parse(req.responseText))
            update(data);
            time = Date.now()
		}
	}
	req.send('');
});

rxjs.interval(100).subscribe( () => 
{
    passedTime = Math.round((Date.now() - time) / 100 );
	document.getElementById('time').textContent = passedTime/10;
});
