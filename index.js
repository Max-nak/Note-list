const App = {
    data() {
        return {
            value: '',
            list: [],
            i: 0,
            checkedNote: [],
            show: true
        }
    },
    methods: {
        addNote() {
            this.list.push(this.value)
            this.checkedNote.push(false)
            this.value = ''
        },
        removeNote(i) {
            this.list.splice(i, 1)
            this.checkedNote.splice(i, 1)
        },
        toggleNote(i) {
            this.checkedNote[i] = !this.checkedNote[i]
        },
        clearList() {
            if (confirm('Вы действительно хотите очистить весь список заметок?')) {
                this.list = []
                this.checkedNote = []
                this.value = ''
                this.i = 0
            }
        },
        moveMe(event) {
            let div = document.querySelector('.creator')
            let shiftX = event.clientX - div.getBoundingClientRect().left;
            let shiftY = event.clientY - div.getBoundingClientRect().top;
            let app = document.getElementById('app')
            div.style.position = 'absolute';
            div.style.zIndex = 10;
            app.append(div);
            moveAt(event.pageX, event.pageY);
            function moveAt(pageX, pageY) {
                div.style.left = pageX - shiftX + 'px';
                div.style.top = pageY - shiftY + 'px';
            }
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
            document.addEventListener('mousemove', onMouseMove);
            div.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                div.onmouseup = null;
            };
            div.ondragstart = function () {
                return false;
            }
        }
    }

}
Vue.createApp(App).mount('#app')