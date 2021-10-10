<template>
  <div class="input-form-container">
    <template v-if="beCheckbox">
      <input class="checkbox-form":type="typeKinds"  :id="forId" :true-value="trueBox" :false-value="falseBox" v-model="inputValue"/>
      <label  :for="forId">{{ labelText }}</label>
    </template>
    <template v-else>
      <label  :for="forId">{{ labelText }}</label>
      <input class="input-form" :type="typeKinds"  :id="forId" :placeholder="placeholder" v-model="inputValue"/>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      status: {
        type: Object
      }
    },
    computed: {
      forId() {
        return !!this.status && !!this.status.id ? this.status.id : 'unnowId'
      },
      typeKinds() {
        return !!this.status && !!this.status.kinds ? this.status.kinds : 'text'
      },
      placeholder() {
        return !!this.status && !!this.status.place ? this.status.place : 'ここに入力ください。'
      },
      labelText() {
        return !!this.status && !!this.status.label ? this.status.label : ''
      },
      trueBox() {
        return !!this.status && !!this.status.true_box ? this.status.true_box : false
      },
      falseBox() {
        return !!this.status && !!this.status.false_box ? this.status.false_box : false
      },
      beCheckbox() {
        return !!this.status && this.status.checkbox_be ? true : false
      },
      inputValue: {
        get: function() {
          return !!this.status && !!this.status.value ? this.status.value : ''
        },
        set: function(newValue) {
          this.$emit('inputFormValue', newValue);
        }
      }
    }
  }
</script>

<style scoped>
  .input-form-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .input-form {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
  }
  .checkbox-form {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
  }
</style>
