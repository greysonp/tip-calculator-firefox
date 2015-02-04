(function() {

    $(document).ready(init);

    function init() {
        $('.btn-group input:radio').change(onTipClick);
        $('#js-bill-amount').on('keydown keyup', updateBill);
        updateBill();
    }

    function onTipClick(e) {
        var text = $(this).val();
        if (text.toLowerCase() === 'other') {
            showCustomTip();
        } else {
            hideCustomTip();
        }
        updateBill();
    }

    function showCustomTip() {
        $('#js-custom-tip').removeClass('hidden');
        $('#js-custom-tip input').on('keydown keyup', function() {
            updateBill();
        });
    }

    function hideCustomTip() {
        $('#js-custom-tip').addClass('hidden');
    }

    function updateBill() {
        var percent = getTipPercent();
        var billAmount = parseFloat($('#js-bill-amount').val());
        var tip = billAmount * percent;
        var totalBill = billAmount + tip;

        $('#js-tip-amount').val(formatMoney(tip));
        $('#js-total-bill').val(formatMoney(totalBill));
    }

    function formatMoney(num) {
        return sprintf('%.2f', num);
    }

    function getTipPercent() {
        if ($('#js-custom-tip').hasClass('hidden')) {
            return parseFloat($('.btn-group input:checked').val()) / 100;
        } else {
            return parseFloat($('#js-custom-tip input').val()) / 100;
        }
    }

})();