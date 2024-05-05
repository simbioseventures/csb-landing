import supabase from './utils/supabase';

async function fetchUserData(teacherId) {

//const connectionString = "postgres://postgres.rncabllloknkjdpmjyke:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
//const secret = "teachercsb123"


try{
  const { data: teacher, error } = await supabase
  .from('teacher')
  .select('*')
  .eq('id', teacherId);

  if (error) {
    throw new Error(error.message);
  }

  return teacher;

  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
}

export default fetchUserData;
  