<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>convert number</title>
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./bulma-0.7.4/css/bulma.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
        <script src="script.js"></script> 
        <style>
            img { cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="columns">
            <div class="column">
            </div>
            <div class="column">
                <h1 class="is-size-1">Convert Number to String</h1>
                <div class="columns">
                    <div class="column">
                        <figure class="image is-128x128">
                            <img id="french_language" src="./img/french_flag.png">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image is-128x128">
                            <img id="england_language" src="./img/england_flag.png">
                        </figure>
                    </div>
                </div>
                <input class="input" type="text" name="convert" id="input">
                <button class="button" id="submit" style="margin-top:4px;">Valider</button>
                <div class="content is-large" id="result"></div>
            </div>
            <div class="column">
            </div>
        </div>
        
    </body>
</html> 
