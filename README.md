# INTRODUCCIÓN

La inflación es una lacra producida, principalmente, por la impresión de moneda por parte de los bancos centrales (Reserva Federal en estados unidos, Banco central europeo en europa). Al aumentar la masa monetaria de forma artificiosa, para subvencionar el déficit de los estados, permitiendo que estos se endeuden a futuro, que esa deuda se eternalice y nunca se pague, genera algo inevitable: el incremento de los bienes de consumo.

Con este repositorio queremos generar una herramienta con la que poder calcular el interés compuesto de imposiciones a plazo, bonos del estado, u otros instrumentos bancarios que permitan vencer la inflación. Y calcular, cuántos años son necesarios para que dado un capital inicial C no se pierda por efecto de la inflación.

Es importante dedicar un repositorio de github a ello, porque con una inflación interanual de entorno al 6 por ciento (la que tenemos ahora a finales de 2023), de mantenerse por un período de 10 años implicarà que el capital que la gente tenga en líquidez va a reducirse a la mitad. Sí, la población española va a perder la mitad de su dinero en 10 años (o lo que es lo mismo: si hoy 30 000 euros compran un coche, en 10 años se necesitarán 60 000 para comprar algo parecido a lo que te compraría hoy esa cantidad).

# FÓRMULAS DE CÁLCULO DEL INTERÉS COMPUESTO

Si hoy tenemos 10 000 euros, ponemos ese dinero de tal modo que nos genere un 3% TIN neto (después de descontar el pago de impuesto por rendimientos del capital que es de un 19%, que aquí no vamos a considerar). En un año tendremos:

$$ 10000 \cdot 1.03 = 10300 $$

En dos años:

$$ (10000 \cdot 1.03)*1.03= 10609 $$

Y, por lo tanto, la fórmula general para calcular cuánto habrá crecido nuestro capital será simplemente exponencial con exponente n:

$$ Q(n) = Q \cdot (1+i)^n $$

Si queremos determinar las ganancias netas a medida que van pasando los años podemos escribir la siguiente función $$Q_{g}(n) $$, que nos servirá para calcular el momento exacto en el que nuestras inversiones en renta fija podrán vencer la inflación:

$$ Q_{g}(n) = Q \cdot (1+i)^n - Q$$

# FÓRMULAS DE CÁLCULO DE LA INFLACIÓN

La inflación podemos calcularla en función del número de n años que pasan, mediante dos funciones distintas.

Intuitivamente podemos entender el IPC de forma multiplicativa, como si el dinero, cada año que pasase, se fuese descontando a sí mismo con la función Q'(n).

POSAR CAS INDUCTIU

 Análogamente al caso anterior, cada año que pasa hay un descuento. En este caso, sin embargo, es un descuento que, cada año que pasa, en valor absoluto, se hace más pequeño (lo cual hace factible que podamos vencerlo con tipos de interés más bajos que la propia inflación):

$$ Q'(n) = Q \cdot (1-i)^n $$

TO DO

# CONCLUSIONES

TO DO