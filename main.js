const baseurl = 'https://playgroundtestrest-hsc2fbfncfaxaqdf.northeurope-01.azurewebsites.net/api/Play/'

const app = Vue.createApp({
    data() {
        return {
            playgrounds: [],
            playground: [],
            newName: "",
            newMaxChildren: null,
            newMinAge: null,
            idtoupdate: null,
            updatename: "",
            updateMaxChildren: null,
            updateMinAge: null,
        }
    },
    mounted() {
        this.GetAll()
    },

    methods: { 
        GetAll() {
            axios.get(baseurl)
            .then(response => {this.playgrounds = response.data})
            console.log("succes")
            .catch(error => {
                console.error("error fetching data from api", error)
            })
        },
        AddPlayground() {
            const newPlayground = {
                id : 1,
                name : this.newName,
                maxChildren : this.newMaxChildren,
                minAge : this.newMinAge
            }
            axios.post(baseurl, newPlayground)
            .then(response => {
                this.playgrounds.push(response.data)
            })
            .catch(error => {
                console.error("error adding the new object")
            })
            this.newid = "";
            this.newName = null;
            this.newAge = null;
            this.newCountry = null;
        },
        UpdatePlayground() {
            const updatePlayground = {
                id : this.idtoupdate,
                name : this.updatename,
                maxChildren : this.updateMaxChildren,
                minAge : this.updateMinAge
            }
            axios.put(`${baseurl}/${this.idtoupdate}`, updatePlayground)
            .then(response => {
                this.playgrounds.push(response.data)
            })
            .catch(error => {
                console.error("it failed pls")
            })
        }
    },
    computed: {
        myComputed() { 
            return ''; 
        }
    }
});


app.mount("#app")
