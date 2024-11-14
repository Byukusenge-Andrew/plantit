declare type SignUpParams ={
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address?: string;
    number: number;
    role: string;
}

declare type LoginUser = {
  email: string;
  password: string;
};