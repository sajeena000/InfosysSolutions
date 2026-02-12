export default defineEventHandler(async (event) => {
    // Just redirect to failure page with a specific reason if desired
    return sendRedirect(event, '/infosys/payment/failure?cause=cancelled')
  })
