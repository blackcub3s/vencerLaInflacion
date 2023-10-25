# INTRODUCCIÓN

La inflación es una lacra producida, principalmente, por la impresión de moneda por parte de los bancos centrales (Reserva Federal en estados unidos, Banco central europeo en europa). Al aumentar la masa monetaria de forma artificiosa, para subvencionar el déficit de los estados, permitiendo que estos se endeuden a futuro, que esa deuda se eternalice y nunca se pague, genera algo inevitable: el incremento de los bienes de consumo.

Con este repositorio queremos generar una herramienta con la que poder calcular el interés compuesto de imposiciones a plazo, bonos del estado, u otros instrumentos bancarios que permitan vencer la inflación. Y calcular, cuántos años son necesarios para que dado un capital inicial C no se pierda por efecto de la inflación.

Es importante dedicar un repositorio de github a ello, porque con una inflación interanual de entorno al 6 por ciento (la que tenemos ahora a finales de 2023), de mantenerse por un período de 10 años implicarà que el capital que la gente tenga en líquidez va a reducirse a la mitad. Sí, la población española va a perder la mitad de su dinero en 10 años (o lo que es lo mismo: si hoy 30 000 euros compran un coche, en 10 años se necesitarán 60 000 para comprar algo parecido a lo que te compraría hoy esa cantidad).

# FÓRMULAS DE CÁLCULO DEL INTERÉS COMPUESTO

Así pues, la variación de nuestro capital según el interés compuesto a un tipo fijo TIN, en tanto por uno $i$, se calcula simplemente con:



```latex
\begin{equation}
    Q(n) = Q \cdot (1+i)^p
\end{equation}

```

# FÓRMULAS DE CÁLCULO DE LA INFLACIÓN

La inflación podemos calcularla en función del número de n años que pasan, mediante dos funciones distintas.

Intuitivamente podemos entender el IPC de forma multiplicativa, como si el dinero, cada año que pase, se fuese descontando a sí mismo, con la función Q'(n):

$$
\begin{equation}
    Q'(n) = Q \cdot (1-i)^p
\end{equation}

$$

TO DO

# CONCLUSIONES

TO DO