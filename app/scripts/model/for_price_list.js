/**
 * Created by liuqi on 14-8-1.
 */


function determine_StartButton(){
    if(Price.hasOngoingPrice() == false){
        var StartButtonStatus = 1;
    }
    else{
        if(Price.getOngoingPrice().activity == Activity.getSelectedActivity().activity){
            var ongoing = Price.getOngoingPrice().count;
        }
        StartButtonStatus = 0;
    }
    return{ongoing: ongoing , status: StartButtonStatus};
}