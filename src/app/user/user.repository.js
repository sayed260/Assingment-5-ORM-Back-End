const { prisma } = require('../../common/db/prisma');
const validator = require("validator");


function checkPasswordLength(password) {
  if (typeof password !== "string" || password.length <= 6) {
    throw new Error("Password must be longer than 6 characters");
  }

  return true;
}

function checkNameLength(name) {
  if (typeof name !== "string" || name.trim().length <= 2) {
    throw new Error("Name must be longer than 2 characters");
  }

  return true;
}

function checkEmail(email) {
  if (typeof email !== "string" || !validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }

  return true;
}





const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
        where: {
          email
        }
  });
};



const upsertUser = async (id, name, email, password) => {
  const userId = Number(id);
  const userData = { name, email, password };
  const createData = {
    id: userId,
    name,
    email,
    password,
    
  };

  return prisma.user.upsert({
    where: { id: userId },
    update: userData,
    create: createData,
    select: { id: true, name: true, email: true, role: true }
  });
}

async function createUser(name, email, Password) {

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: Password
        },
        select: { id: true, name: true, email: true },
        
        })
        return user;


}



const findUserById = async (id) => {
  const user = prisma.user.findUnique({
         where: {
          id: Number(id),
        },
        omit: { role: true }
    })

    return user;
}




module.exports = {
  findUserByEmail,
  checkPasswordLength,
  checkNameLength,
  checkEmail,
  createUser,
  upsertUser,
  findUserById,
};





