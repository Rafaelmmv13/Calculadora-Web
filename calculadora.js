(function() {
    var Pantallas = document.querySelector(".Pantalla");
    var Botones = document.querySelectorAll(".boton");
    var historialLista = document.getElementById("historialLista");
    var btnLimpiarHistorial = document.getElementById("btnLimpiarHistorial");

    function cargarHistorial() {
        var historial = JSON.parse(localStorage.getItem('calculadoraHistorial') || '[]');
        
        if (historial.length === 0) {
            historialLista.innerHTML = '<div class="historial-vacio">No hay operaciones guardadas</div>';
            return;
        }

        var html = '';
        for (var i = 0; i < historial.length; i++) {
            var item = historial[i];
            html += '<div class="historial-item">';
            html += '<div class="historial-operacion">' + item.operacion + '</div>';
            html += '<div class="historial-resultado">= ' + item.resultado + '</div>';
            html += '</div>';
        }
        
        historialLista.innerHTML = html;
    }

    function GuardarHistorial(operacion, resultado) {
        var historial = JSON.parse(localStorage.getItem('calculadoraHistorial') || '[]');

       
        var nuevoCalculo = {
            operacion: operacion,
            resultado: resultado,
        };

        historial.unshift(nuevoCalculo);
        
        
        if (historial.length > 1000) {
            historial = historial.slice(0, 1000);
        }
        
        localStorage.setItem('calculadoraHistorial', JSON.stringify(historial));
        cargarHistorial();
    }

    function limpiarHistorial() {
        if (confirm('¿Estás seguro de que quieres eliminar todo el historial?')) {
            localStorage.removeItem('calculadoraHistorial');
            cargarHistorial();
        }
    }

    Botones.forEach(function(boton) {
        boton.addEventListener("click", function() {
            var ApretarBoton = boton.textContent;

            if (boton.id === "C") {
                Pantallas.textContent = "0";
                return;
            }

            if (boton.id === "Borrar") {
                if (Pantallas.textContent.length === 1 || Pantallas.textContent === "Error!") {
                    Pantallas.textContent = "0";
                } else {
                    Pantallas.textContent = Pantallas.textContent.slice(0, -1);
                }
                return;
            }

            if (boton.id === "igual") {
                
                try {
                    var operacion = Pantallas.textContent;
                    var resultado = eval(Pantallas.textContent);
                    Pantallas.textContent = resultado;
                    GuardarHistorial(operacion, resultado);
                } catch (error) {
                    Pantallas.textContent = "Error!";
                }

                if(Pantallas.textContent === "Infinity"){
                    Pantallas.textContent = "No se puede dividir entre 0"
                }
                return;
            }
            
            if (Pantallas.textContent === "0" || Pantallas.textContent === "Error!" || Pantallas.textContent === "No se puede dividir entre 0") {
                Pantallas.textContent = ApretarBoton;
            } else {
                Pantallas.textContent += ApretarBoton;
            }
        });
    });

    btnLimpiarHistorial.addEventListener("click", limpiarHistorial);

    cargarHistorial();
})();