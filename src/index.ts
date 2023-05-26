import { connect } from './db';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export function convertJSDateToSQLDate(
  date: string | Date | Prisma.DateTimeFieldUpdateOperationsInput
) {
  if (typeof date != 'string') {
    date = date.toString();
  }
  const d = new Date(date);
  return d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
}

export async function getUsers() {
  const conn = await connect();
  const users = await conn.execute('SELECT * FROM users');
  // console.log(users[0]);

  // return users[0];
}

export async function getUserById(id: string) {
  const conn = await connect();
  const users = await conn.query(`SELECT * FROM users WHERE id = '${id}'`);
  return users[0];
}

export async function updateUserById(
  id: number,
  data: Prisma.usersUpdateInput
) {
  if (data.created_at)
    data.created_at = convertJSDateToSQLDate(data.created_at);
  if (data.updated_at)
    data.updated_at = convertJSDateToSQLDate(data.updated_at);
  if (data.lastSignInAt)
    data.lastSignInAt = convertJSDateToSQLDate(data.lastSignInAt);
  const conn = await connect();
  let changeDataStr = '';
  Object.keys(data).forEach((key: string, index: number) => {
    if (index === 0) {
      changeDataStr += `${key} = '${
        data[key as keyof Prisma.usersUpdateInput]
      }'`;
    } else {
      changeDataStr += ` ,${key} = '${
        data[key as keyof Prisma.usersUpdateInput]
      }'`;
    }
  });
  console.log(changeDataStr);
  try {
    await conn.query(
      `UPDATE users SET ${changeDataStr} WHERE user_id = '${id}';`
    );
    console.log('User Updated');
  } catch (error) {
    console.error(error);
  }
}

export async function createUser(newUser: Prisma.usersCreateInput) {
  newUser.created_at = convertJSDateToSQLDate(newUser.created_at);
  newUser.updated_at = convertJSDateToSQLDate(newUser.updated_at);
  newUser.lastSignInAt = convertJSDateToSQLDate(newUser.lastSignInAt);
  const conn = await connect();
  try {
    await conn.execute(
      `INSERT INTO users (${Object.keys(newUser).join(
        ','
      )}) VALUES (${Object.values(newUser)
        .map((v) => `'${v}'`)
        .join(',')})`
    );
    console.log('New User Created');
  } catch (error) {
    console.error(error);
  }
}

export async function usePrismaToGetUsers() {
  const users = await prisma.users.findMany();
  // console.log(users);
}

export async function usePrismaToUpdateUser(
  user_id: number,
  data: Prisma.usersUpdateInput
) {
  return prisma.users.update({
    where: {
      user_id: user_id,
    },
    data: data,
  });
}

const newUser = {
  firstName: 'Sanjib',
  lastName: 'Kumar Sen',
  fullName: 'Sanjib Kumar Sen',
  clerk_id: 'user_2N65dHAC',
  lastSignInAt: '2012-06-22 05:40:06',
  username: 'sanjib',
  primaryEmailAddress: 'sanjib.s@projectwaitless.io',
  created_at: '2012-06-22 05:40:06',
  updated_at: '2012-06-22 05:40:06',
};

(async () => {
  const start = Date.now();
  // updateUserById(12, {
  //   username: 'lois',
  // });
  // connect();
  // await getUsers();

  // getUserById('user_2N65dHAC66svZNJRlbT6PESnt5I');
  // createUser(newUser);
  // await usePrismaToGetUsers();
  await usePrismaToUpdateUser(1, { username: 'lois' });
  // await updateUserById(1, { username: 'lois' });
  const end = Date.now();
  console.log(`Execution time: for Prisma ${end - start} ms`);
})();
