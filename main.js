const baseurl = 'https://wine-cpduh8a3aegeh2f9.northeurope-01.azurewebsites.net/api/Wine/'

const app = Vue.createApp({
    data() {
        return {
            wines: [],
            wine: [],
            sortedwines : [],
            ratingR: null,
            IdDelete: null,
            newManufactor: "",
            newYear: null,
            newPrice: null,
            newRating: null,
            getId: null,
            idtoupdate: null,
            updateManufactor: "",
            updateYear: null,
            updatePrice: null,
            updateRating: null,
            errormsg: "",
            errormsgDelete: "",
            errormsgGetId: "",
            errormsgUpdateWine: "",
            
        }
    },
    mounted() {
        this.GetAll()
    },

    methods: { 
        GetAll() {
            axios.get(baseurl)
            .then(response => {this.wines = response.data})
            console.log("succes")
            .catch(error => {
                console.error("error fetching data from api", error)
            })
        },
        AddWine() {
            const newWine = {
                id : 1,
                manufacturer : this.newManufactor,
                year : this.newYear,
                price : this.newPrice,
                rating : this.newRating
            }
            axios.post(baseurl, newWine)
            .then(response => {
                this.wines.push(response.data)
                this.errormsg = ""; // Ryd fejlmeddelelse ved succes
            })
            .catch(error => {
                console.error("error adding the new object")
                this.errormsg = error.response?.data || "Failed to add wine. Please check your input.";
            })
            this.newManufactor = "";
            this.newYear = null;
            this.newPrice = null;
            this.newRating = null;
        },
        UpdateWine() {
            const updateWine = {
                id : this.idtoupdate,
                manufacturer : this.updateManufactor,
                year : this.updateYear,
                price : this.updatePrice,
                rating : this.updateRating

            }
            axios.put(`${baseurl}/${this.idtoupdate}`, updateWine)
            .then(response => {
                this.wines.push(response.data)
                this.errormsgUpdateWine = ""
            })
            .catch(error => {
                console.error("it failed pls")
                this.errormsgUpdateWine = error.response?.data;
            })
        },
        GetById() {
            const getbyid = this.getId;
            
            if (!getbyid) {
                console.error("ID is required");
                return;
            }
        
            axios.get(`https://wine-cpduh8a3aegeh2f9.northeurope-01.azurewebsites.net/api/Wine/${getbyid}`)
                .then(response => {
                    console.log("Success:", response.data); 
                    this.getId = null; 
                    this.wine = response.data;
                    this.errormsgGetId = "";
                })
                .catch(error => {
                    console.error("Error sorry: invalid id ", error); 
                    this.errormsgGetId = "Sorrry invalid id";
                });
        },
        deleteWine() {
            const deletionId = this.IdDelete
            console.log("id set")
            axios.delete('https://wine-cpduh8a3aegeh2f9.northeurope-01.azurewebsites.net/api/Wine/' + deletionId)
            .then(response => {
                console.log("succes actor deleted")
                this.IdDelete = null
                this.errormsgDelete = ""
                
                
            })
            .catch(error => {
                console.error("Error deleting actor!!", error);
                this.errormsgDelete = error.response?.data
            });
            
        },
        Sort() {
            const ratingsort = this.ratingR;
        
            
        
            // Send GET-anmodning med korrekt URL
            axios.get(`https://wine-cpduh8a3aegeh2f9.northeurope-01.azurewebsites.net/api/Wine/byrating/${ratingsort}`)
                .then(response => {
                    this.sortedwines = response.data;
                    console.log("Success:", response.data);
                })
                .catch(error => {
                    console.error("Error:", error.response ? error.response.data : error.message);
                    console.log("Fail");
                });
        }
        
    },
    computed: {
        myComputed() { 
            return ''; 
        }
    }
});


app.mount("#app")
