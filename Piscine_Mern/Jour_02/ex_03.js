db.createCollection( "students",
   { validator: { $and:
      [
         { Id: {$type: "int" } },
         { Lastname: { $type: "string" } },
         { Firstname: { $type: "string" } },
         { Email: { $type: "string", $regex: '^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$'} },
         { Phone: { $type: "string", $regex: '^[0-9]{10,}$' } },
         { Validated: { 
            $type: "string",
            $in: [ "In progress", "Validated", "Rejected" ]
           } 
         },
         { Admin: { $type: "bool"} }
      ]
   }
})

db.students.insert({
    Id: 1,
    Lastname: 'Brossard', 
    Firstname: 'Robin',
    Email: 'rob.brsd@outlook.fr',
    Phone: '0665487596',
    Validated: 'Validated',
    Admin: true
})

db.students.insert({ 
   Id: 23,
   Lastname: 'Illiece',
   Firstname: 'MEssaoudi',
   Email: 'rob.br@orange.fr',
   Phone: '0665487596',
   Validated: 'Rejected',
   Admin: false,
})
 

//getNextSequenceValue("Id")