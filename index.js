import express from 'express';
const port = process.env.PORT || 3000

const app = express();

app.get("/api/ping", (req, res) => {
    console.log("Ping API was called");
    
    const response = { message: "Pinging API Successful" };
    
    console.log("Ping API response:", response);
    res.json(response);
});

app.use(express.json());

app.post('/risk-calculation', (req, res) => {
    const data = req.body;
    let riskScore = 0;
    let riskCategory = "";
    function ageScore(age){
        if (age < 30){
            riskScore +=0;
        }else if (age >= 30 && age < 45){
            riskScore +=10;
        }else if (age >= 45 && age < 60){
            riskScore +=20;
        }else if (age >= 60){
            riskScore +=30;
        }
    }
    function bmiScore(bmi){
        switch(bmi){
            case "normal":
                riskScore +=0;
                break;
            case "overweight":
                riskScore +=30;
                break;
            case "obese":
                riskScore +=75;
                break;
        }
    }
    function bpScore(bp){
        switch (bp){
            case "normal":
                riskScore +=0;
                break;
            case "elevated":
                riskScore +=15;
                break;
            case "stage 1":
                riskScore +=30;
                break;
            case "stage 2":
                riskScore +=75;
                break;
            case "crisis":
                riskScore +=100;
                break;
        }
    }
    function familyScore(family){
        if (family === "none"){
            riskScore +=0;
        }else{
            riskScore +=10;
        }
    }
    function riskCalculation(){
        ageScore(data.age);
        bmiScore(data.bmi);
        bpScore(data.bloodpressure);
        familyScore(data.familydisease);

        if (riskScore <= 20){
            riskCategory = "low risk";
        }else if (riskScore <= 50){
            riskCategory = "moderate risk";
        }else if (riskScore <= 75){
            riskCategory = "high risk";
        }else if (riskScore > 75){
            riskCategory = "uninsurable";
        }

    }
    riskCalculation();
    res.status(200).json({result: riskCategory})
})
app.listen(port, function(error){
    if (error){
        console.log('Something went wrong', error)
    }
    else{
        console.log('Server is listening on port ' + port)
    }
})