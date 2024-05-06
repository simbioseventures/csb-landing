import supabase from './utils/supabase';

async function saveThemes(teacherId:number, values:number[]) {

//const connectionString = "postgres://postgres.rncabllloknkjdpmjyke:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
//const secret = "teachercsb123"
try{
    const { error } = await supabase
    .from('teacher')
    .update([
      { votou: true, escolha01: values[0], escolha02: values[1], escolha03: values[2], escolha04: values[3], escolha05: values[4], escolha06: values[5] },
    ])
    .eq('id', teacherId)
    .select()
  
  if (error) {
    throw new Error(error.message);
  }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
}

export default saveThemes;
  