# -*- encoding: utf-8 -*-
from odoo import fields
from odoo import models
from odoo import api


class Company(models.Model):
    _name = 'res.company'
    _inherit = ['res.company']
    is_branch = fields.Boolean()

    def _model_selection(self):
        selection = super(Company, self)._model_selection()
        selection.append(('queue.management.branch', 'Queue Management Branch'))
        return selection

    @api.model
    def create(self, vals):
        company = super(Company, self).create(vals)
        company_admin = self.env['res.users'].search([('groups_id', 'in',
                                                       [self.env.ref('queue_management.group_queue_management_admin').id])])
        if company.is_branch:
            company_admin.write({'company_ids': [(4, company.id, 0)]})
        return company
