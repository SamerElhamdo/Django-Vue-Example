<template>
    <div>
      <el-container>
        <el-main>
          <el-row class="box-row" type="flex" justify="center" align="middle">
          <el-col  :xs="20" :span="12">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <p v-if="incorrectAuth">خطأ في أسم المستخدم أو كلمة المرور - يرجى المحاولة بمعلومات صحيحة</p>
                <el-form-item  label="أسم المستخدم" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="كلمة السر" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">تسجيل  الدخول</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('ادخل اسم المستخدم'));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('الرجاء ادخل كلمة السر'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          password: ''
          
        },
        incorrectAuth: false,
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      login () { 
        this.$store.dispatch('userLogin', {
          username: this.ruleForm.username,
          password: this.ruleForm.password
        })
        .then(() => {
          this.$router.push({ name: 'posts' })
          this.$message({
            message: 'تم تسجيل الدخول بنجاح',
            type: 'success'
            });
        })
        .catch(err => {
          console.log(err)
          this.error = err

          this.incorrectAuth = true
        })
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .box-row {
    height: 100vh;

  }

  .el-form-item__content {
    padding: 0;
  }
  .el-form-item__label {
    float: right;
  }
</style>