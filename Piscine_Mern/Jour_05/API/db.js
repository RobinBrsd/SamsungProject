db.createCollection( "Billets",    
    { validator: { $and:       
        [          
            { Id: { $type: "int" } },
            { Id_User: { $type: "int"} },          
            { Title: { $type: "string" } },          
            { Content: { $type: "string" } },          
            { Maison: { $type: "bool" } }, 
            { Jardin: { $type: "bool" } },
            { Voiture: { $type: "bool" } }
        ]
    } })