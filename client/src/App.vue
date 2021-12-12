<template>
  <v-app>


   <v-main>


    <v-app-bar light>


      <v-toolbar-title> 
        <span class="font-weight-light">Ninja</span>
        <span>Pandas</span>
      </v-toolbar-title>


      <div class="ml-5">
        <span class="font-weight-bold">Level1</span>
        <span class="grey--text ml-3">Sort columns</span>
      </div>


      <v-spacer></v-spacer>

      <v-btn  class="secondary mr-5" @click=" hint = !hint ">Show hint</v-btn>
      <v-btn  :disabled="!pyodideLoaded" class="green mr-5" @click = "runPython">Run</v-btn>
      <v-btn disabled class="primary ">Next Level</v-btn>


    </v-app-bar>




    <v-bottom-sheet v-model="hint" >


     <v-alert
     border="left"
     colored-border
     dark
     class="ma-5"
     elevation="2"
     >
     Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut velit. Nulla facilisi..

     Morbi mollis tellus ac sapien. Fusce vel dui. Praesent ut ligula non mi varius sagittis. Vivamus consectetuer hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
   </v-alert>




 </v-bottom-sheet>



 <div id="content">

  <v-sheet width="400" dark>


    <v-card flat>
      <v-card-title> Expected</v-card-title>
      <v-card-subtitle> Expected</v-card-subtitle>

      <v-data-table id="expected" :items  = "expected">
        
      </v-data-table>

    </v-card>



    <v-card flat>
      <v-card-title> Results</v-card-title>
      <v-card-subtitle> Results</v-card-subtitle>

      <v-data-table id="results" :items = "results" :headers = "results_header">
        
      </v-data-table>

    </v-card>


  </v-sheet>

  <AceEditor 
  v-model="content" 
  @init="editorInit" 
  lang="python" 
  theme="monokai" 
  width="100%" 
  height="100vh"
  :options="{
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    fontSize: 14,
    highlightActiveLine: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 2,
    showPrintMargin: false,
    showGutter: true,
  }"
  :commands="[
  {
    name: 'save',
    bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
    exec: dataSumit,
    readOnly: true,
  },
  ]"
  />



</div>



<v-footer padless>

  <v-col class="text-center" cols="12">

    sacha & charles prod 

  </v-col> 

</v-footer>

</v-main>




</v-app>
</template>

<style type="text/css">

#sidebar {

  width: 33%;
  height: 100vh;

}

#console {

  background-color: red;
  width: 100%;



}


#content {
  display: flex;


}


</style>

<script>

import AceEditor from 'vuejs-ace-editor';
import Vue from "vue";
export default {

  components: {AceEditor},


  data: () => ({

    hint: false,
    pyodideLoaded: false,
    errorMsg : "",
    content: "salut",

    expected: [], 

    results: [],

    results_header : []

  }),



  mounted: async function () {
    
    await this.initializePyodide();


  },



  methods: {
    dataSumit() {
            //code here
          },
          editorInit: function () {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/javascript')    //language
            require('brace/mode/python')    //language
            require('brace/mode/less')
            require('brace/theme/monokai')
            require('brace/snippets/python') 

          },


          runPython: function() {


              let end_code = "df.to_json(orient='records')"


              let result = window.pyodide.runPython(this.content + "\n" + end_code)


              
              result = JSON.parse(result)
              let keys = Object.keys(result[0])
              let headers = []
              for (let i in keys){
                let name = keys[i]
                headers.push({"text":name, "value":name})
              }

              

              console.debug(result)
              console.debug(keys)
              console.debug(headers)

              this.results_header = headers
              this.results = result
              


/*              this.results_header = [
                { text:'Game #',value: 'name'  },
                { text:"Player 1", value:"PlayerOne" },
                { text:"Player 2", value:"PlayerTwo" }
            ]

              this.results =  [
                {name: 'name 1', PlayerOne: 'john', PlayerTwo: 'Mike'},
                {name: 'name 2', PlayerOne: 'James', PlayerTwo: 'Bill'},
                {name: 'name 3', PlayerOne: 'Jack', PlayerTwo: 'Ben'}
            ]*/


          },

          initializePyodide: async function () {

            console.debug("HELLO")


           try {

              window.languagePluginUrl ="https://cdn.jsdelivr.net/pyodide/v0.17.0/full/";
             await Vue.loadScript("https://cdn.jsdelivr.net/pyodide/v0.17.0/full/pyodide.js" );


        // wait for pyodide ready
        await window.languagePluginLoader;

        console.debug("FINI")

      

        // load pandas lib
        await window.pyodide.loadPackage(["pandas"]);
        this.pyodideLoaded = true;

      } catch (error) {
        console.debug("ERRROR", error)
        this.errorMsg = error;
      }


    },




  },
}
</script>
