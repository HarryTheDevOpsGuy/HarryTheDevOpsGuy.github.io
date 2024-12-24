---
layout: base
title: Blog
permalink: /cron-builder.html
---

 <style>
    /* body { font-family: 'Roboto', sans-serif; } */
    .highlight { background-color:rgba(116, 236, 238, 0.72); transition: background-color 1s ease; }
    .card-custom { border: none; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
    .btn-custom { border-radius: 50px; }
    .code-block { background-color: #f8f9fa; padding: 5px 10px; border-radius: 5px; font-family: monospace; }
    .icon-btn { color: #007bff; cursor: pointer; }
    .icon-btn:hover { color: #0056b3; }
    .details { display: none; margin-top: 10px; }
    .example-card { color: var(--text-color, #e0e0e0); cursor: pointer; transition: transform 0.2s; border: 1px solid var(--theme-color, #bb86fc);; border-radius: 10px; padding: 15px; margin-bottom: 15px; }
    .example-card:hover { transform: scale(1.02); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
    .example-card .card-header { display: flex; justify-content: space-between; align-items: center; }
</style>

<div class="container py-5">
    <h1 class="text-center mb-5">Cron Expression Generator</h1>
    <div class="card card-custom p-4 mb-4">
        <h3 class="card-title">Evaluate Cron Expression:</h3>
        <div class="input-group mb-3">
            <input type="text" class="form-control" id="cronInput" placeholder="* * * * *">
            <button class="btn btn-primary btn-custom" type="button" onclick="evaluateCron()">Evaluate</button>
            <button class="btn btn-warning btn-custom" type="button" onclick="generateAndEvaluateRandomCron()">Generate & Evaluate Random Cron</button>
        </div>
        <p id="cronDescription" class="text-muted"></p>
    </div>
    <div class="card card-custom p-4">
        <h3 class="card-title">Examples:</h3>
        <div id="examplesList"></div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/cron-parser/2.17.0/cron-parser.min.js"></script>
<script>
    const getDescription = (minute, hour, dayOfMonth, month, dayOfWeek) => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let description = `At ${minute === '*' ? 'every minute' : minute + ' minute(s)'} past ${hour === '*' ? 'every hour' : hour + ' hour(s)'}`;
        if (dayOfMonth !== '*') description += ` on day ${dayOfMonth} of the month`;
        if (month !== '*') description += ` in ${months[month - 1]}`;
        if (dayOfWeek !== '*') description += ` on ${daysOfWeek[dayOfWeek]}`;
        return description;
    };

    const getNextRepetitions = (cronExpression, count = 5) => {
        try {
            const interval = cronParser.parseExpression(cronExpression);
            return Array.from({ length: count }, () => interval.next().toString()).join(', ');
        } catch (err) {
            return 'Invalid cron expression';
        }
    };

    const evaluateCron = () => {
        const cronInput = $('#cronInput').val();
        const cronParts = cronInput.split(' ');
        if (cronParts.length !== 5) return $('#cronDescription').text('Invalid cron expression');
        const [minute, hour, dayOfMonth, month, dayOfWeek] = cronParts;
        const description = getDescription(minute, hour, dayOfMonth, month, dayOfWeek);
        $('#cronDescription').text(description);
        addExample(cronInput, description);
    };

    const generateAndEvaluateRandomCron = () => {
        const randomCronExpression = `${Math.random() < 0.5 ? '*' : Math.floor(Math.random() * 60)} ${Math.random() < 0.5 ? '*' : Math.floor(Math.random() * 24)} ${Math.random() < 0.5 ? '*' : Math.floor(Math.random() * 31) + 1} ${Math.random() < 0.5 ? '*' : Math.floor(Math.random() * 12) + 1} ${Math.random() < 0.5 ? '*' : Math.floor(Math.random() * 7)}`;
        $('#cronInput').val(randomCronExpression);
        evaluateCron();
    };

    const generateRecurringRandomCronWithinMonth = () => {
        const randomCronExpression = `${Math.random() < 0.5 ? '*' : Math.floor(Math.random() * 60)} ${Math.random() < 0.5 ? '*' : Math.floor(Math.random() * 24)} ${Math.random() < 0.5 ? '*' : Math.floor(Math.random() * 31) + 1} ${Math.random() < 0.5 ? '*' : Math.floor(Math.random() * 12) + 1} *`;
        const description = getDescription(...randomCronExpression.split(' '));
        addExample(randomCronExpression, description);
        setTimeout(generateRecurringRandomCronWithinMonth, Math.floor(Math.random() * 15000) + 15000);
    };

    const addExample = (cronExpression, description) => {
        const nextRepetitions = getNextRepetitions(cronExpression);
        const addedTime = new Date().toLocaleString();
        const newExample = $(`
            <div class="example-card highlight" onclick="showDetails(this)">
                <div class="card-header">
                    <div>
                        <div class="fw-bold">Random example:</div>
                        <span class="text-muted">${description}</span>
                    </div>
                    <div>
                        <code class="code-block">${cronExpression}</code>
                        <i class="fas fa-copy icon-btn" onclick="copyToClipboard('${cronExpression}')"></i>
                    </div>
                </div>
                <div class="card-body details">
                    <p><strong>Next Repetitions:</strong> <span class="next-repetitions">${nextRepetitions}</span></p>
                    <p><strong>Added by:</strong> System</p>
                    <p><strong>Added time:</strong> <span class="added-time">${addedTime}</span></p>
                    <p><strong>Added location:</strong> Server</p>
                </div>
            </div>
        `);
        $('#examplesList').prepend(newExample);
        setTimeout(() => newExample.removeClass('highlight'), 2000);
        showDetails(newExample[0]);
        setTimeout(() => $(newExample).find('.details').slideUp(), 5000);
    };

    const copyToClipboard = text => navigator.clipboard.writeText(text).then(() => alert('Cron expression copied to clipboard'));

    const showDetails = element => $(element).find('.details').slideToggle();

    generateRecurringRandomCronWithinMonth();
</script>