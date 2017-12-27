/* Abstraction for any Input/Output filed in a Tab */
class Field {
  constructor(baseID,unitList,defaultUn,updateCallback,textGenerator) {
    this.unitlessValue = 0;
    this.isValid = true;

    if(unitList === undefined || unitList.length == 0) {
      unitList = [units.defaultUnit];
    }
    this.unit  = units.defaultUnit;
    this.unitList = unitList;
    this.valueField = document.getElementById(baseID+"-value");

    var fieldThis = this;
    if(this.valueField.tagName === "INPUT") {
      $("#"+baseID+"-value").on("input", function (evt) {
        fieldThis.setUnitTextValue(evt.target.value);
      });
    }

    this.descriptionField  = document.getElementById(baseID+"-description");

    this.unitField  = document.getElementById(baseID+"-unit");
    if(this.unitField !== null) {
      this.unitField.addEventListener("change",function (evt) {
        fieldThis.updateUnit(evt.target.value);
      });
    }

    this.textGenerator  = textGenerator;
    this.updateUnit(defaultUn);
    this.updateCallback = updateCallback;
  }

  getUnitlessValue() {
    return this.unitlessValue;
  }

  setUnitValue(newValue, unit) {
    this.setUnitlessValue(unit.convertToUnitless(newValue));
  }

  setUnitlessValue(newValue, viewUpdate) {
    this.isValid = true;

    if(viewUpdate === undefined) {
      viewUpdate = true;
    }

    this.unitlessValue = newValue;
    if(this.updateCallback !== undefined) {
      this.updateCallback(newValue);
    }

    if(viewUpdate) {
      this.updateView();
    }
  }

  setUnitTextValue(newValue) {
    var val = parseFloat(newValue);
    if(!isNaN(val)) {
      var viewUpdate = (this.valueField.tagName !== "INPUT")
      this.setUnitlessValue(this.unit.convertToUnitless(val), viewUpdate);
    }
  }

  updateUnit(newUnit) {
    if(newUnit>this.unitList.length) {
      newUnit = 0;
    }

    this.unit = this.unitList[newUnit];
    this.updateDescription();
    this.updateView();
  }

  updateView() {
    if(this.valueField.tagName === "INPUT") {
      this.valueField.value = highRound(this.unit.convertToUnit(this.unitlessValue))
    } else {
      if(this.isValid) {
        this.valueField.innerHTML = roundExp(this.unit.convertToUnit(this.unitlessValue));
      } else {
        this.valueField.innerHTML = "-";
      }
    }

  }

  updateDescription() {
    if(this.textGenerator !== undefined) {
      this.descriptionField.innerHTML = this.textGenerator(this.unit);
    } else {
      this.descriptionField.innerHTML = "";
    }
  }

  invalidate() {
    if(this.valueField.tagName === "INPUT") {
      return;
    }
    this.isValid = false;
    this.updateView();
  }
}

function highRound(val) {
  return Math.round(val*1000000000)/1000000000;
}

function roundExp(x) {
  var val = (x+"").split(/[eE]/)
  var f = val[0];
  f = roundUp(parseFloat(f));
  if(val.length > 1) {
    var e = val[1];
    f = f+"e"+e;
  }
  return parseFloat(f);
}

function roundUp(x) {
  return Math.ceil(x*100)/100
}

function generateField(baseID, name, updateCallback, textGenerator, unitList, defaultUnit) {
  // Generates a table row with Name, Input/Output Field, Description Text and Unitpicker
  // Returns a Field object

  var parentTR = document.getElementById(baseID);

  //Text Field
  var th = document.createElement("th");
  th.setAttribute("id",baseID+"-name");
  var textnode = document.createTextNode(name+": ");
  th.appendChild(textnode);
  parentTR.appendChild(th);


  //Input/Output
  th = document.createElement("th");

  var node;
  if(updateCallback === undefined) {
    //Output Field
    node = th;
    node.setAttribute("class","output");
    textnode = document.createTextNode("");
    th.appendChild(textnode);
  } else {
    //Input Field
    node = document.createElement("input");
    node.setAttribute("type","text");
    node.setAttribute("style","text-align: right;");
    th.appendChild(node);
  }
  node.setAttribute("id",baseID+"-value");
  parentTR.appendChild(th);



  //Unitpicker
  th = document.createElement("th");
  if(unitList.length > 0) {
    var unitPicker = document.createElement("select");
    unitPicker.setAttribute("class","unitPicker");
    unitPicker.setAttribute("id",baseID+"-unit");

    unitPicker.addEventListener("change",function(e){
      unitPicker.options[0].value = e.target.selectedIndex-1;
      unitPicker.options[0].innerHTML = unitList[e.target.selectedIndex-1].symbol;
      unitPicker.options[0].selected = true;
    });
    th.appendChild(unitPicker);

    node = document.createElement("option");
    node.setAttribute("disabled","disabled");
    node.setAttribute("selected","selected");
    node.setAttribute("hidden","hidden");
    textnode = document.createTextNode(unitList[defaultUnit].symbol);
    node.appendChild(textnode);
    unitPicker.appendChild(node);

    var i=0;
    for (unit of unitList) {
      node = document.createElement("option");
      //node.setAttribute("title",unit.name);
      node.value = i;
      textnode = document.createTextNode(unit.name);
      node.appendChild(textnode);
      unitPicker.appendChild(node);
      i++;
    }
  }
  parentTR.appendChild(th);

  //Description
  th = document.createElement("th");
  th.setAttribute("class","descriptionField");
  th.setAttribute("id",baseID+"-description");
  textnode = document.createTextNode("Default Description");
  th.appendChild(textnode);
  parentTR.appendChild(th);

  return new Field(baseID, unitList, defaultUnit, updateCallback, textGenerator);
}

function generateRangeField(baseID, name, textGenerator, unitList, defaultUnit) {
  var field = generateField(baseID, name, undefined, textGenerator, unitList, defaultUnit);

  field.lowerUnitless = 0;
  field.upperUnitless = 0;
  field.setUnitlessValues = function(x,y) {
    this.isValid = true;
    this.lowerUnitless = x;
    this.upperUnitless = y;
    this.updateView();
  };

  field.updateView = function() {
    if(this.isValid) {
      var low = roundExp(this.unit.convertToUnit(this.lowerUnitless));
      var up = roundExp(this.unit.convertToUnit(this.upperUnitless));

      this.valueField.innerHTML = low+" - "+up;
    } else {
      this.valueField.innerHTML = "-";
    }
  }
  return field;
}
