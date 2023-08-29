export const IDENTIFY_QUERY = `SELECT
c_primary.id AS primaryContactId,
GROUP_CONCAT(DISTINCT c_emails.email) AS emails,
GROUP_CONCAT(DISTINCT c_phones.phoneNumber) AS phoneNumbers,
GROUP_CONCAT(DISTINCT c_secondary.id) AS secondaryContactIds,
GROUP_CONCAT(DISTINCT c_secondary.email) AS secondaryEmails,
GROUP_CONCAT(DISTINCT c_secondary.phoneNumber) AS secondaryPhoneNumbers
FROM
contact AS c_primary
LEFT JOIN contact AS c_secondary ON c_primary.id = c_secondary.linkedId AND c_secondary.linkPrecedence = 'SECONDARY'
LEFT JOIN contact AS c_emails ON c_primary.email = c_emails.email
LEFT JOIN contact AS c_phones ON c_primary.phoneNumber = c_phones.phoneNumber
WHERE
c_primary.email = ? AND c_primary.phoneNumber = ?
GROUP BY
c_primary.id;`