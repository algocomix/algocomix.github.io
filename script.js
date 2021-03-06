new Vue({
    el: "#app",
    data: {
      number: "",
      current: {},
      loading: true,
      max: "",
      remaining: ""
    },
    created: function() {
      this.xkcd();
    },
    watch: {
      number: function(value, oldvalue) {
        if (oldvalue === "") {
          this.max = value;
        } else {
          this.xkcd();
        }
      }
    },
    methods: {
      getRandom: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //the maximum and minimum are inclusive
      },
      randomComic: function() {
        this.number = this.getRandom(1, this.max);
      },
      firstComic: function() {
        this.number = 1;
      },
      lastComic: function() {
        this.number = this.max;
      },
      previousComic: function() {
        this.number = this.current.num - 1;
      },
      nextComic: function() {
        this.number = this.current.num + 1;
      },
      xkcd: function() {
        this.loading = true;
        fetch("https://xkcd.now.sh/" + this.number)
          .then(response => {
            return response.json();
          })
          .then(json => {
            this.current = json;
            this.loading = false;
            this.number = json.num;
            return true;
          })
          .catch(err => {
            this.number = this.max;
          });
      }
    },

    computed: {
      month: function() {
        var month = new Array();
        if (this.current.month === undefined) return "";
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[this.current.month - 1];
      }
    }
  });
  