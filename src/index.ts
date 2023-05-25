import { connect } from './db';

export function convertJSDateToSQLDate(date: string | Date) {
  const d = new Date(date);
  return d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
}

export async function getUsers() {
  const conn = await connect();
  const users = await conn.execute('SELECT * FROM users');
  console.log(users[0]);
}

export async function getUserById(id: string) {
  const conn = await connect();
  const users = await conn.query(`SELECT * FROM users WHERE id = '${id}'`);
  console.log(users[0]);
}

export async function updateUserByClerkId(clerk_id: string, data: any) {
  const conn = await connect();
  let changeDataStr = '';
  Object.keys(data).forEach((key: string, index: number) => {
    if (index === 0) {
      changeDataStr += `${key} = '${data[key]}'`;
    } else {
      changeDataStr += ` ,${key} = '${data[key]}'`;
    }
  });
  console.log(changeDataStr);

  try {
    await conn.query(
      `UPDATE users SET ${changeDataStr} WHERE clerk_id = '${clerk_id}';`
    );
  } catch (error) {
    console.log(error);
  }
}

export async function createUser() {
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
    console.log(error);
    return {
      message: error,
    };
  }
  return {
    message: 'New User Created',
  };
}

// connect();
getUsers();
// getUserById('user_2N65dHAC66svZNJRlbT6PESnt5I');
// createUser();
// updateUserByClerkId('user_2N65dHAC66svZNJRlbT6PESnt5I', { uername: 'lois' });
