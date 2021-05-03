const request=require('request')

const forecast =(lati,longi,callback)=>{
    
    const url='http://api.weatherstack.com/current?access_key=68aa56c190d10758077dfc1d31732a6a&query='+lati+','+longi+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Network',undefined)
        }else if(body.error){
            callback('Unable to find the location. Try again.',undefined)
        }else{
            callback(undefined,'It`s '+body.current.weather_descriptions+' Outside. It is currently '+body.current.temperature+' degree out. There is a '+body.current.precip+'% chance of rain. ')
        }
        
    })
}

module.exports=forecast