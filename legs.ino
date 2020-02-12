// ArduinoJson - Version: 5.13.5
#include <ArduinoJson.h>
#include <ArduinoJson.hpp>
#include <SoftwareSerial.h>
#include <Servo.h>


Servo myServo; 
SoftwareSerial bluetoothSerial(2, 3); // указываем пины rx и tx соответственно


#define SPEED_1      5 
#define DIR_1        4
#define SPEED_2      6
#define DIR_2        7

void setup()  {
  pinMode(2,INPUT);
  pinMode(3,OUTPUT);
  Serial.begin(9600);
  bluetoothSerial.begin(38400);
  myServo.attach(9);
}

void loop() {
  if (bluetoothSerial.available()) {
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& state = jsonBuffer.parseObject(bluetoothSerial);
     
    int m1Speed = state["M1"];
    int m2Speed = state["M2"];
    int m1Direction = state["M1Direction"];
    int m2Direction = state["M2Direction"];
    int servoValue = state["servo"];
    //    
    myServo.write(servoValue);
    analogWrite(SPEED_1,  m1Speed);  
    analogWrite(SPEED_2,  m2Speed);

    if(m1Direction == 0)
      digitalWrite(DIR_1, HIGH);

    if(m1Direction == 1)
      digitalWrite(DIR_1, LOW);


    if(m2Direction == 0)
      digitalWrite(DIR_2, HIGH);

    if(m2Direction == 1)
      digitalWrite(DIR_2, LOW);
      
  }
}
