/**
 * Created by lh on 15-3-23.
 */
app.filter('enum',function(EnumType) {
    return function(input,type) {

      if(input == undefined){
        return ;
      }
      if(typeof input != 'string'){
            if (typeof input == 'number') {
                input = input.toString();
            } else {
                return null;
            }
        }
        var enums = '';
        var inputs = input.split(',');
        if(inputs.length > 1){
            for(var i = 0;i < EnumType[type].length;i++){
                for(var j = 0;j < inputs.length;j++){
                    if(EnumType[type][i].value == inputs[j]){
                        enums += EnumType[type][i].text+",";
                    }
                }
            }
            return enums.substr(0,enums.length - 1);
        }

        var items = EnumType[type].filter(function(element) {
            return element.value == input;
        });
        if(items[0]) {return items[0].text}
    }
})
