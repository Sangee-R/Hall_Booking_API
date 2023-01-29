//All required
const express = require("express")
const Room = express()

//Middleware
Room.use(express.json())

//NODE DATA Save point
Data = [ {
    id: 1,
    roomName: "293",
    noOfSeatsAvailable: "7",
    amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
    pricePerHr: 150,
    bookedStatus: false,
    customerDetails: {
    customerName: "",
    date: "28-01-2023",
    startTime: "10 Am",
    endTime: "11 Pm",
    },
},
{
    id: 2,
    roomName: "155",
    noOfSeatsAvailable: "9",
    amenities: ["Hot shower", "WIFI", "Intercom", "Room service","Food"],
    pricePerHr: 250,
    bookedStatus: true,
    customerDetails: {
    customerName: "Reddy",
    date: "29-01-2023",
    startTime: "17.28 pm",
    endTime: "18.30 pm",
    },
},
{
    id: 3,
    roomName: "011",
    noOfSeatsAvailable: "4",
    amenities: ["Hot shower", "WIFI", "Intercom", "Room service","AC","Heater"],
    pricePerHr: 200,
    bookedStatus: false,
    customerDetails: {
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    },
},
{
    id: 4,
    roomName: "234",
    noOfSeatsAvailable: "3",
    amenities: ["Hot shower", "Room service"],
    pricePerHr: 150,
    bookedStatus: true,
    customerDetails: {
    customerName: "Meera Shetti",
    date: "22-12-2022",
    startTime: "11.00 Am",
    endTime: "12.00 Pm",
    },
},
{
    id: 5,
    roomName: "066",
    noOfSeatsAvailable: "11",
    amenities: ["Hot shower", "WIFI", "Intercom", "Room service","AC","Bath tub","Play station","Bar"],
    pricePerHr: 5000,
    bookedStatus: true,
    customerDetails: {
    customerName: "Raj Kapur",
    date: "19-11-2022",
    startTime: "10.00 Am",
    endTime: "10.00 AM",
    },
},
{
    id: 6,
    roomName: "300",
    noOfSeatsAvailable: "9",
    amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
    pricePerHr: 200,
    bookedStatus: false,
    customerDetails: {
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    },
},
{
    id: 7,
    roomName: "293",
    noOfSeatsAvailable: "7",
    amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
    pricePerHr: 150,
    bookedStatus: false,
    customerDetails: {
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    },
},
{
    id: 8,
    roomName: "105",
    noOfSeatsAvailable: "8",
    amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
    pricePerHr: 165,
    bookedStatus: true,
    customerDetails: {
    customerName: "Sai",
    date: "20-01-2023",
    startTime: "15:10 Am",
    endTime: "15:10 Pm",
    },
}
]



// Create All Rooms (POST METHOD)
Room.post("/Room/Create", function (req, res) {
    req.body.id = Data.length + 1;
    Data.push(req.body);

    //POST Message
    res.json({ Message: "Room created Done Boss" });
})



//Get all Room with Booking info (GET METHOD)
Room.get("/Rooms/All",function(req,res){
    res.send(
        Data.map((Recive)=>{
            if(Recive.bookedStatus == true){
                return{
                    "id":Recive.id,
                    "Room Name":Recive.roomName,
                    "Booked Status":"Already Booked",
                    "Customer Name":Recive.customerDetails.customerName,
                    "Date":Recive.customerDetails.date,
                    "Start time":Recive.customerDetails.startTime,
                    "End time":Recive.customerDetails.endTime
                }
            }
            // If Room is Available
            else{
                return{
                    "id":Recive.id,
                    "Room No":Recive.roomName,
                    "Booked Status":"Available"
                }
            }
        })
    )
})




//Booking Room Customer (POST METHOD)
Room.post("/Rooms/Customers",function(req,res){
    //Booking
    const All = req.body

    //Available Check and Book
    Data.map((fix)=>{
        if(fix.id == All.id){
            if(fix.customerDetails.date != All.date){
                fix.customerDetails.customerName = All.customerName;
                fix.customerDetails.date = All.date;
                fix.customerDetails.startTime = All.startTime;
                fix.customerDetails.endTime = All.endTime;
                fix.bookedStatus = !fix.bookedStatus;
                res.send("Thankyou for Booking")
            }
            //Incase Not Available
            else{
                res.send("Sorry! Room is Already Booked")
            }
        }
        return fix
    })
})



//Get all Customers with booking Rooms (POST METHOD)
Room.get("/Rooms/Customers",function(req,res){
    res.send(
        Data.filter((Availability)=>{
            if(Availability.bookedStatus == true){
                return Availability
            }
        })
        .map((Availability)=>{
            return{
                "Room no":Availability.id,
                "Customer Name":Availability.customerDetails.customerName,
                "Room Name":Availability.roomName,
                "Date":Availability.customerDetails.date,
                "Start time":Availability.customerDetails.startTime,
                "End time":Availability.endTime
            }
        })
    )
})


Room.listen(process.env.PORT ||4001)
