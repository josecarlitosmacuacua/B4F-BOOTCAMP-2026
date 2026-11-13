interface User {
    name: string;
    email:string;
    isActive : boolean ;
}
interface Student  extends User {
edition : string ;
course :string ;
code: string;
genero : "masculino" | "feminino" | "outro";
}
