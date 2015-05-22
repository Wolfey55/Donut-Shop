function DonutShop(name, minCustomers, maxCustomers,
                    avgDonuts, hoursOp) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgDonuts = avgDonuts;
  this.hoursOp = hoursOp;

  this.getRandCustPerHour = function() {
    var range = this.maxCustomers - this.minCustomers + 1;
    var random = Math.floor(Math.random() * range + this.minCustomers);
    return random;
  }

  this.perHour = function() {
    this.bakeHour = Math.floor(this.getRandCustPerHour() * this.avgDonuts);
    return this.bakeHour;
  };

  this.perDay = function() {
    var bakeDay = Math.floor(this.perHour() * this.hoursOp);
    return bakeDay;
  };

}

var downtown = new DonutShop("Downtown", 8, 43, 4.50, 8),
    capitolHill = new DonutShop("Capitol Hill", 4, 37, 2.00, 24),
    slu = new DonutShop("South Lake Union", 9, 23, 6.33, 10),
    wedgewood = new DonutShop("Wedgewood", 2, 28, 1.25, 7),
    ballard = new DonutShop("Ballard", 8, 58, 3.75, 10),
    wallingford = new DonutShop("Wallingford", 1, 2, 3, 4);

function DonutMaster() {

  this.newList = [];

  this.addShop = function(donutShop) {
    //adds a new DonutShop to a list //
      this.newList.push(donutShop);
  };

  this.addTableRows = function() {
    for (var i = 0; i < this.newList.length; i++) {
      $("tbody").append("<tr id='row" + i + "'></tr>");
      $("#row" + i).append("<td>" + this.newList[i].name + "</td>");
      $("#row" + i).append("<td id='day" + i + "'></td>");
      $("#row" + i).append("<td id='hour" + i + "'></td>");
    }

  }

  this.updateReport = function() {
    //loops through the list of DonutShops and output location/donutperhour/donutperday //
    for (var i = 0; i < this.newList.length; i++) {
      $("#day" + i).text(this.newList[i].perDay());
      $("#hour" + i).text(this.newList[i].bakeHour);
      console.log("The " + this.newList[i].name + " shop needs to bake " +
                  this.newList[i].perDay() + " donuts per day." +
                 this.newList[i].bakeHour + " donuts per hour.");
    }
  };
  
  var that = this;
  
  this.generateForm = function() {
    for (var i = 0; i < this.newList.length; i++) {
      var formText = "<td><form>" +
        "<input type='text' data-group='"+i+"' id='minCust" + i + "' " +
        "placeholder='minCust' name='minCust'>" +
        "</input>" +
        "<input type='text' data-group='"+i+"'" +
        "placeholder='maxCust' name='maxCust'>" +
        "</input>" +
        "<button data-group='"+i+"' id='btn"+i+"'>Regenerate</button></form></td>";
      $("#row" + i).append(formText);
      $("#btn"+i).on("click", function(e) {
        e.preventDefault();
        var group = $(this).attr("data-group");
        var minCust = $("[name='minCust'][data-group=" + group + "]").val()
        var maxCust = $("[name='maxCust'][data-group=" + group + "]").val()
        console.log("Min cust " + minCust);
        console.log("Max cust " + maxCust);
        that.newList[group].minCustomers = minCust;
        that.newList[group].maxCustomers = maxCust;
        that.updateReport();
      });
    }
  }      
}

var donutMaster = new DonutMaster();
donutMaster.addShop(downtown);
donutMaster.addShop(capitolHill);
// and so on for all the donut shops

donutMaster.addTableRows();
donutMaster.updateReport();
donutMaster.generateForm();